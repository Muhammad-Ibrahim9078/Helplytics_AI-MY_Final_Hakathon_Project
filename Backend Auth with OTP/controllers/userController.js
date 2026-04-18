import { verifyMail } from "../emailVerify/verifyMail.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { Session } from "../models/sessionModel.js";
import { sendOtpMail } from "../emailVerify/sendOtpMail.js";



export const registerUser = async (req, res) => {
    try {

        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "All Field are Required"
            })

        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        // Map frontend role format to database enum
        let dbRole = "Both";
        if (role === "Need Help") dbRole = "Requester";
        if (role === "Can Help") dbRole = "Helper";
        if (role === "Both" || role === "Requester" || role === "Helper") dbRole = role;

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: dbRole
        })


        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "10m" })

        verifyMail(token, email)
        newUser.token = token

        await newUser.save()

        return res.status(201).send({
            success: true,
            message: "User Register",
            data: newUser
        })
    } catch (error) {

        return res.status(500).send({
            success: false,
            message: error.message
        })

    }
}









export const Verification = async (req, res) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Authorization Token is Missing or Invalid"
            })
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY)
        } catch (error) {

            if (error.name === "TokenExpiredError") {
                return res.status(400).send({
                    success: false,
                    message: "The Register Token Has Expired"
                })
            }
            return res.status(400).send({
                success: false,
                message: "Token Verification Failed"
            })
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }


        user.token = null
        user.isVerified = true
        await user.save()

        return res.status(200).send({
            success: true,
            message: "Email Verified Successfully"
        })
    } catch (error) {

        return res.status(500).send({
            success: false,
            message: error.message
        })
    }


}







export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "All Fields Are Required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorize Access"
            })
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(402).send({
                success: false,
                message: "Inncorrect Password"
            })
        }

        if (user.isVerified !== true) {
            return res.status(403).send({
                success: false,
                message: "Verify your Account than Login"
            })
        }

        const existingSession = await Session.findOne({ userId: user._id });

        if (existingSession) {
            await Session.deleteOne({ userId: user._id });
        }

        await Session.create({ userId: user._id })

        const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "10d" })
        const refreshToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "30d" })

        user.isLoggedIn = true
        await user.save();

        return res.status(200).send({
            success: true,
            message: `Welcome Back ${user.username}`,
            accessToken,
            refreshToken,
            user
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}










export const logoutUser = async (req, res) => {
    try {
        const userId = req.userId;
        await Session.deleteMany({ userId });
        await User.findByIdAndUpdate(userId, { isLoggedIn: false })
        return res.status(200).send({
            success: true,
            message: "Logged out Successfully"
        })
    } catch (error) {

        return res.status(500).send({
            status: false,
            message: error.message
        })

    }
}









export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "User Not Found"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000)

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save();
        await sendOtpMail(email, otp)

        return res.status(200).send({
            sucess: true,
            message: "OTP Send Successfully"
        })

    } catch (error) {

        return res.status(500).send({
            status: false,
            message: error.message
        })

    }
}












export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            message: "Email and OTP are required"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP not Generated or Already Verified"
            });
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has Expired"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP Verified Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};














export const changePassword = async (req, res) =>{

    const {newPassword, confimPassword} = req.body;
    const email = req.params.email;


    if(!newPassword || !confimPassword){
         return res.status(400).send({
                success: false,
                message: "All fields are Required"
            })
    }


    if(newPassword !== confimPassword){
         return res.status(400).send({
                success: false,
                message: "Password do Not Match"
            })
    }


    try {

        const user = await User.findOne({email});
        if(!user){
             return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }


        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

         return res.status(200).send({
                success: true,
                message: "Password Changed Successfully"
            })
        
    } catch (error) {

         return res.status(500).send({
                success: false,
                message: "Internal Server Error"
            })
        
    }
}


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password -token -otp -otpExpiry");

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            });
        }

        return res.status(200).send({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { username, location, skills, interests } = req.body;

        const updateData = {};
        if (username) updateData.username = username;
        if (location !== undefined) updateData.location = location;
        if (skills !== undefined) {
            updateData.skills = typeof skills === "string" 
                ? skills.split(",").map(s => s.trim()).filter(s => s)
                : skills;
        }
        if (interests !== undefined) {
            updateData.interests = typeof interests === "string"
                ? interests.split(",").map(i => i.trim()).filter(i => i)
                : interests;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).send({
                success: false,
                message: "At least one field is required to update"
            });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select("-password -token -otp -otpExpiry");

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            user
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).send({
                success: false,
                message: "New passwords do not match"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Incorrect current password"
            });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return res.status(200).send({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};