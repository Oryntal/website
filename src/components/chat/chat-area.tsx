'use client';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';

interface Message {
	id: string;
	content: string;
	sender: 'user' | 'ai';
	timestamp: string;
}

interface ChatAreaProps {
	activeConversation: string | null;
}

const ChatArea = ({ activeConversation }: ChatAreaProps) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		// Load conversation messages based on activeConversation
		if (activeConversation === '1') {
			setMessages([
				{
					id: '1',
					content:
						"Hello! I'd like help with planning a new project. Can you guide me through the process?",
					sender: 'user',
					timestamp: '10:30 AM'
				},
				{
					id: '2',
					content:
						"I'd be happy to help you plan your project! Let's start by understanding your goals and requirements. Could you tell me more about what kind of project you're working on?",
					sender: 'ai',
					timestamp: '10:31 AM'
				}
			]);
		} else if (activeConversation === 'new' || !activeConversation) {
			setMessages([]);
		}
	}, [activeConversation]);

	const handleSendMessage = async () => {
		if (!inputValue.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			content: inputValue,
			sender: 'user',
			timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue('');
		setIsTyping(true);

		// Simulate AI response
		setTimeout(() => {
			const aiMessage: Message = {
				id: (Date.now() + 1).toString(),
				content:
					"Thank you for your message! I'm here to help you with whatever you need. How can I assist you today?",
				sender: 'ai',
				timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			};
			setMessages((prev) => [...prev, aiMessage]);
			setIsTyping(false);
		}, 1500);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const adjustTextareaHeight = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	}, [inputValue]);

	if (!activeConversation) {
		return (
			<div className="bg-background flex flex-1 items-center justify-center">
				<div className="max-w-md text-center">
					<div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
						<svg
							className="text-primary h-8 w-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							/>
						</svg>
					</div>
					<h2 className="text-foreground mb-2 text-xl font-semibold">Welcome to Oryntal AI</h2>
					<p className="text-muted-foreground">
						Select a conversation or start a new chat to begin
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-1 flex-col">
			<div className="flex-1 space-y-6 overflow-y-auto p-6">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
					>
						<div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
							<div
								className={`rounded-2xl px-4 py-3 ${
									message.sender === 'user'
										? 'bg-accent text-accent-foreground ml-4'
										: 'bg-muted text-muted-foreground mr-4'
								}`}
							>
								<p className="text-sm leading-relaxed">{message.content}</p>
							</div>
							<div
								className={`text-muted-foreground mt-1 text-xs ${
									message.sender === 'user' ? 'mr-4 text-right' : 'ml-4 text-left'
								}`}
							>
								{message.timestamp}
							</div>
						</div>
					</div>
				))}

				{isTyping && (
					<div className="flex justify-start">
						<div className="max-w-[70%]">
							<div className="bg-muted text-muted-foreground mr-4 rounded-2xl px-4 py-3">
								<div className="flex items-center space-x-1">
									<div className="h-2 w-2 animate-bounce rounded-full bg-current"></div>
									<div
										className="h-2 w-2 animate-bounce rounded-full bg-current"
										style={{ animationDelay: '0.1s' }}
									></div>
									<div
										className="h-2 w-2 animate-bounce rounded-full bg-current"
										style={{ animationDelay: '0.2s' }}
									></div>
								</div>
							</div>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			<div className="border-border border-t p-4">
				<div className="mx-auto flex max-w-4xl items-end gap-3">
					<div className="relative flex-1">
						<textarea
							ref={textareaRef}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="Type your message..."
							className="bg-input border-border focus:ring-ring max-h-[120px] min-h-[48px] w-full resize-none rounded-2xl border px-4 py-3 text-sm leading-relaxed focus:ring-2 focus:outline-none"
							rows={1}
						/>
					</div>
					<button
						onClick={handleSendMessage}
						disabled={!inputValue.trim()}
						className="bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0 rounded-2xl p-3 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
					>
						<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatArea;
