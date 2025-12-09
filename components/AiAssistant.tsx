import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { streamGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';

const AiAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: "Hi! I'm GitMaster AI. Ask me anything about Git or GitHub!", timestamp: Date.now() }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        const modelMsgPlaceholder: ChatMessage = { role: 'model', text: '', timestamp: Date.now() + 1 };
        setMessages(prev => [...prev, modelMsgPlaceholder]);

        let currentText = '';

        await streamGeminiResponse(userMsg.text, (chunk) => {
            currentText += chunk;
            setMessages(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1] = { ...newHistory[newHistory.length - 1], text: currentText };
                return newHistory;
            });
        });

        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {isOpen && (
                <div className="pointer-events-auto bg-[#161b22] border border-github-border rounded-xl shadow-2xl w-[90vw] md:w-[400px] h-[500px] flex flex-col overflow-hidden mb-4 transition-all animate-in slide-in-from-bottom-5">
                    {/* Header */}
                    <div className="bg-[#010409] p-4 flex items-center justify-between border-b border-github-border">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-github-green animate-pulse"></div>
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Bot className="w-5 h-5 text-github-purple" />
                                GitMaster AI
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                           <button onClick={toggleChat} className="text-gray-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0d1117]">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-github-blue text-white rounded-br-none' 
                                    : 'bg-[#21262d] text-github-light rounded-bl-none border border-github-border'
                                }`}>
                                    <ReactMarkdown 
                                        components={{
                                            code({node, className, children, ...props}) {
                                                return <code className={`${className} bg-black/30 rounded px-1 py-0.5 text-xs font-mono`} {...props}>{children}</code>
                                            },
                                            pre({node, children, ...props}) {
                                                return <pre className="bg-black/30 p-2 rounded my-2 overflow-x-auto text-xs" {...props}>{children}</pre>
                                            }
                                        }}
                                    >
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        {isLoading && messages[messages.length - 1].text === '' && (
                            <div className="flex justify-start">
                                <div className="bg-[#21262d] p-3 rounded-lg rounded-bl-none border border-github-border flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 bg-[#161b22] border-t border-github-border flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about git..."
                            className="flex-1 bg-[#0d1117] text-white border border-github-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-github-blue transition-colors"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !input.trim()}
                            className="bg-github-green hover:bg-[#2c974b] text-white p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}

            <button
                onClick={toggleChat}
                className="pointer-events-auto bg-github-purple hover:bg-[#a371f7] text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 group"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                {!isOpen && <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">Ask AI</span>}
            </button>
        </div>
    );
};

export default AiAssistant;