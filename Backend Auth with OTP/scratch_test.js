const runTest = async () => {
    try {
        // 1. Login to get token
        const loginRes = await fetch("http://localhost:8000/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "ayesha@helphub.com",
                password: "Test1234"
            })
        });
        
        const loginData = await loginRes.json();
        if (!loginData.success) throw new Error(loginData.message || "Login failed");
        
        const token = loginData.accessToken;
        console.log("Logged in! Token obtained.");
        
        // 2. Try to create a request
        const reqRes = await fetch("http://localhost:8000/api/requests", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify({
                title: "Test Request from Node Fetch",
                description: "Just testing the API endpoint",
                category: "Web Development",
                urgency: "Low",
                tags: "api, test, react"
            })
        });
        
        const result = await reqRes.json();
        console.log("Create request response:", result);
    } catch (error) {
        console.log("Error details:", error.message);
    }
};

runTest();
