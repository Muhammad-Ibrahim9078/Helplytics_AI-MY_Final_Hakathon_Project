import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getData } from '../context/UserContext';
import { io } from 'socket.io-client';

const Messages = () => {
    const location = useLocation();
    const contextData = getData() || {};
    const currentUser = contextData.user;

    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedPartner, setSelectedPartner] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const [sending, setSending] = useState(false);

    const [socket, setSocket] = useState(null);

    const messagesEndRef = useRef(null);
    const selectedPartnerRef = useRef(selectedPartner);

    useEffect(() => {
        selectedPartnerRef.current = selectedPartner;
    }, [selectedPartner]);

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (!currentUser) return;
        const newSocket = io("http://localhost:8000", {
            query: { userId: currentUser._id || currentUser.id }
        });

        newSocket.on("connect", () => {
            console.log("[Socket] Connected to server successfully");
        });

        newSocket.on("newMessage", (message) => {
            console.log("[Socket] Received real-time message:", message);
            
            const fromId = message.from._id || message.from;
            const isForActiveChat = selectedPartnerRef.current && (
                (selectedPartnerRef.current._id && selectedPartnerRef.current._id.toString() === fromId.toString()) ||
                (selectedPartnerRef.current.username === message.from.username)
            );

            if (isForActiveChat) {
                setChatHistory(prev => [...prev, message]);
            } else {
                toast.info(`New message from ${message.from.username || "Community Member"}`);
            }
            
            fetchConversations();
        });

        setSocket(newSocket);
        return () => newSocket.close();
    }, [currentUser]);

    // Also fetch conversations when currentUser is ready to ensure IDs match
    useEffect(() => {
        if (currentUser) {
            fetchConversations();
        }
    }, [currentUser]);

    const getPartnerForMsg = (msg) => {
        if (msg.partner && msg.partner.username) return msg.partner;

        const myId = currentUser?._id || currentUser?.id;
        const myUsername = currentUser?.username;

        const fromObj = msg.from;
        const toObj = msg.to;

        // Ensure we are working with populated objects
        if (!fromObj || !toObj) return { username: "Unknown" };

        const fromId = fromObj._id || fromObj;
        const toId = toObj._id || toObj;

        // If we know exactly who we are by ID
        if (myId) {
            if (fromId.toString() === myId.toString()) return toObj;
            if (toId.toString() === myId.toString()) return fromObj;
        }

        // If ID isn't mapping correctly, fallback to comparing usernames
        if (myUsername) {
            if (fromObj.username === myUsername) return toObj;
            if (toObj.username === myUsername) return fromObj;
        }

        // Ultimate fallback: just pick the one that isn't null
        return fromObj || toObj || { username: "Unknown" };
    };

    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.get("http://localhost:8000/api/messages", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                // Remove local fallback map, handle directly via helper function.
                setConversations(res.data.data);

                // If location state exists and we haven't selected a partner yet
                if (location.state?.recipient && !selectedPartner) {
                    const targetRecipient = location.state.recipient;
                    let foundPartnerObj = null;

                    for (const c of res.data.data) {
                        const p = getPartnerForMsg(c);
                        if (p && p.username === targetRecipient) {
                            foundPartnerObj = p;
                            break;
                        }
                    }
                    if (foundPartnerObj) {
                        handleSelectConversation(foundPartnerObj);
                    } else {
                        // Fallback: manual start
                        handleSelectConversation({ username: location.state.recipient, _isNew: true });
                    }
                }
            }
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectConversation = async (partner) => {
        setSelectedPartner(partner);
        setChatHistory([]);

        if (partner._isNew) return; // Ignore fetching history for mock partners

        setHistoryLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.get(`http://localhost:8000/api/messages/${partner._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setChatHistory(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch chat history:", error);
            toast.error("Failed to load conversation history");
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!messageInput.trim() || !selectedPartner) return;

        setSending(true);
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.post("http://localhost:8000/api/messages",
                { to: selectedPartner._id || selectedPartner.username, content: messageInput },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                setMessageInput('');
                // If it's a new conversation, we don't have their ID yet until we refresh explicitly
                if (selectedPartner._isNew) {
                    setSelectedPartner(res.data.data.to.username === selectedPartner.username ? res.data.data.to : res.data.data.from);
                    fetchConversations();
                } else {
                    // Just push to local state
                    setChatHistory(prev => [...prev, res.data.data]);
                    fetchConversations(); // refresh sidebar silently
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        } finally {
            setSending(false);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex-1 flex flex-col pb-12">
                <div className="flex flex-col lg:flex-row gap-6 h-[80vh]">

                    {/* Left: Conversations Sidebar */}
                    <div className="w-full lg:w-[380px] bg-[#FAF9F5] rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col h-full">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block pl-2">MESSAGES</span>
                        <h2 className="text-[28px] font-bold leading-tight mb-6 tracking-tight text-[#111] pl-2">Recent chats</h2>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
                            {loading ? (
                                <div className="flex justify-center py-10">
                                    <div className="animate-spin w-6 h-6 border-4 border-[#1a8570] border-t-transparent rounded-full"></div>
                                </div>
                            ) : conversations.length === 0 ? (
                                <p className="text-gray-400 text-[13px] py-10 text-center">No active chats.</p>
                            ) : (
                                conversations.map((msg) => {
                                    const resolvedPartner = getPartnerForMsg(msg);
                                    return (
                                        <div key={msg.id || msg._id}
                                            onClick={() => handleSelectConversation(resolvedPartner)}
                                            className={`rounded-[20px] p-4 flex gap-3 transition-all cursor-pointer border ${selectedPartner?.username === resolvedPartner?.username ? 'bg-white border-[#1a8570] shadow-sm' : 'bg-transparent border-transparent hover:bg-white hover:shadow-sm'}`}>
                                            <div className="w-12 h-12 bg-orange-500 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs mt-0.5">
                                                {resolvedPartner?.username?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "??"}
                                            </div>
                                            <div className="flex flex-col flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-bold text-[15px] text-[#111] truncate pr-2">
                                                        {resolvedPartner?.username || "Unknown"}
                                                    </h3>
                                                    <span className="text-[10px] font-bold text-gray-400 shrink-0 mt-1">
                                                        {formatTime(msg.time || msg.createdAt)}
                                                    </span>
                                                </div>
                                                <p className="text-[13px] text-gray-500 truncate">{msg.preview || msg.content}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>

                    {/* Right: Active Chat View */}
                    <div className="flex-1 bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col overflow-hidden h-full">
                        {!selectedPartner ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center bg-[#FAF9F5]/50">
                                <div className="w-20 h-20 bg-[#1a8570]/10 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#1a8570]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h2 className="text-[24px] font-bold text-[#111] mb-2 tracking-tight">Your Messages</h2>
                                <p className="text-gray-500 text-[15px] max-w-[300px]">Select a conversation from the sidebar or click "Chat" on a request page to start talking.</p>
                            </div>
                        ) : (
                            <>
                                {/* Chat Header */}
                                <div className="h-[88px] border-b border-gray-100 flex items-center px-8 shrink-0 bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs ring-4 ring-[#FAF9F5]">
                                            {selectedPartner.username?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "??"}
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-[18px] text-[#111] leading-tight">{selectedPartner.username}</h2>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                <span className="text-[12px] text-green-600 font-medium tracking-wide">Available</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Feed */}
                                <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-[#FAF9F5]/30 custom-scrollbar">
                                    {historyLoading ? (
                                        <div className="flex justify-center py-10">
                                            <div className="animate-spin w-8 h-8 border-4 border-[#1a8570] border-t-transparent rounded-full"></div>
                                        </div>
                                    ) : chatHistory.length === 0 ? (
                                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                                            <span className="bg-[#1a8570]/10 text-[#1a8570] text-[12px] font-bold px-4 py-1.5 rounded-full mb-4">New Connection</span>
                                            <p className="text-gray-500 text-[14px]">Say hello to {selectedPartner.username}!</p>
                                        </div>
                                    ) : (
                                        chatHistory.map((msg, idx) => {
                                            const isMe = currentUser && msg.from && (msg.from._id === currentUser._id || msg.from === currentUser._id);
                                            return (
                                                <div key={msg._id || idx} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`flex flex-col gap-1.5 max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                                                        <div className={`px-5 py-3.5 rounded-[20px] text-[14.5px] leading-relaxed relative ${isMe ? 'bg-[#1a8570] text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'}`}>
                                                            {msg.content}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-400 px-1">
                                                            {formatTime(msg.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-6 bg-white border-t border-gray-100 shrink-0">
                                    <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
                                        <div className="flex-1 bg-[#FAF9F5] border border-[#ebe9e1] rounded-2xl relative transition-all focus-within:border-[#1a8570] focus-within:bg-white focus-within:shadow-sm">
                                            <textarea
                                                value={messageInput}
                                                onChange={(e) => setMessageInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage(e);
                                                    }
                                                }}
                                                placeholder={`Message ${selectedPartner.username}...`}
                                                className="w-full bg-transparent px-5 py-4 text-[14.5px] text-gray-800 focus:outline-none resize-none placeholder:text-gray-400 custom-scrollbar block min-h-[56px] max-h-[140px]"
                                                rows="1"
                                                style={{ height: 'auto' }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={sending || !messageInput.trim()}
                                            className="w-14 h-[56px] bg-[#1a8570] hover:bg-[#156d5b] text-white rounded-2xl flex items-center justify-center shrink-0 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-sm"
                                        >
                                            {sending ? (
                                                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                            ) : (
                                                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #e2e8f0;
                    border-radius: 20px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                }
            `}</style>
        </div>
    );
};

export default Messages;
