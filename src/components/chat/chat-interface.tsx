'use client';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';

interface Message {
	id: string;
	content: string;
	sender: 'user' | 'ai';
	timestamp: Date;
}

interface Conversation {
	id: string;
	title: string;
	lastMessage: string;
	time: string;
	isPinned: boolean;
	unread: number;
	messages: Message[];
}

interface ChatInterfaceProps {
	activeConversation: string | null;
	onConversationSelect: (id: string | null) => void;
}

const ChatInterface = ({ activeConversation, onConversationSelect }: ChatInterfaceProps) => {
	const [conversations, setConversations] = useState<Conversation[]>([
		{
			id: '1',
			title: 'Welcome Chat',
			lastMessage: 'Hello! How can I help you today?',
			time: '2 min ago',
			isPinned: true,
			unread: 0,
			messages: [
				{
					id: '1',
					content: 'Hello! How can I help you today?',
					sender: 'ai',
					timestamp: new Date()
				}
			]
		},
		{
			id: '2',
			title: 'Project Planning',
			lastMessage: "Let's discuss your project requirements",
			time: '1 hour ago',
			isPinned: false,
			unread: 2,
			messages: [
				{
					id: '2',
					content: "Let's discuss your project requirements",
					sender: 'ai',
					timestamp: new Date()
				}
			]
		}
	]);

	const [newMessage, setNewMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const currentConversation = conversations.find((c) => c.id === activeConversation);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [currentConversation?.messages]);

	const handleSendMessage = async () => {
		if (!newMessage.trim() || !activeConversation) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			content: newMessage,
			sender: 'user',
			timestamp: new Date()
		};

		// Add user message
		setConversations((prev) =>
			prev.map((conv) =>
				conv.id === activeConversation
					? {
							...conv,
							messages: [...conv.messages, userMessage],
							lastMessage: newMessage,
							time: 'now'
						}
					: conv
			)
		);

		setNewMessage('');
		setIsLoading(true);

		// Simulate AI response
		setTimeout(() => {
			const aiMessage: Message = {
				id: (Date.now() + 1).toString(),
				content:
					'Not implemented.',
				sender: 'ai',
				timestamp: new Date()
			};

			setConversations((prev) =>
				prev.map((conv) =>
					conv.id === activeConversation
						? {
								...conv,
								messages: [...conv.messages, aiMessage],
								lastMessage: aiMessage.content,
								time: 'now'
							}
						: conv
				)
			);
			setIsLoading(false);
		}, 1000);
	};

	const createNewChat = () => {
		const newConv: Conversation = {
			id: Date.now().toString(),
			title: 'New Chat',
			lastMessage: 'Start a new conversation',
			time: 'now',
			isPinned: false,
			unread: 0,
			messages: []
		};
		setConversations((prev) => [newConv, ...prev]);
		onConversationSelect(newConv.id);
		setSidebarOpen(false);
	};

	const togglePin = (conversationId: string, event: React.MouseEvent) => {
		event.stopPropagation(); // Prevent conversation selection when clicking pin button
		setConversations((prev) =>
			prev.map((conv) =>
				conv.id === conversationId ? { ...conv, isPinned: !conv.isPinned } : conv
			)
		);
	};

	return (
		<div className="bg-background border-border premium-shadow flex h-[calc(100vh-5rem)] overflow-hidden rounded-xl border">
			{/* Mobile sidebar overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`bg-sidebar border-sidebar-border glass-effect fixed inset-y-0 left-0 z-50 w-80 transform border-r transition-all duration-300 ease-in-out lg:relative ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} `}
			>
				<div className="flex h-full flex-col">
					<div className="border-sidebar-border border-b p-6">
						<button
							onClick={createNewChat}
							className="gradient-shift pulse-glow w-full rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
						>
							✨ New Chat
						</button>
					</div>

					<div className="flex-1 space-y-6 overflow-y-auto p-6">
						{/* Pinned conversations */}
						<div className="mb-6">
							<h3 className="text-sidebar-foreground mb-4 text-sm font-bold tracking-wider uppercase">
								📌 Pinned
							</h3>
							<div className="space-y-3">
								{conversations
									.filter((c) => c.isPinned)
									.map((conversation) => (
										<ConversationItem
											key={conversation.id}
											conversation={conversation}
											isActive={activeConversation === conversation.id}
											onClick={() => {
												onConversationSelect(conversation.id);
												setSidebarOpen(false);
											}}
											onTogglePin={togglePin}
										/>
									))}
							</div>
						</div>

						{/* Recent conversations */}
						<div>
							<h3 className="text-sidebar-foreground mb-4 text-sm font-bold tracking-wider uppercase">
								💬 Recent
							</h3>
							<div className="space-y-3">
								{conversations
									.filter((c) => !c.isPinned)
									.map((conversation) => (
										<ConversationItem
											key={conversation.id}
											conversation={conversation}
											isActive={activeConversation === conversation.id}
											onClick={() => {
												onConversationSelect(conversation.id);
												setSidebarOpen(false);
											}}
											onTogglePin={togglePin}
										/>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main chat area */}
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="border-border glass-effect border-b p-6">
					<div className="flex items-center gap-4">
						<button
							onClick={() => setSidebarOpen(true)}
							className="hover:bg-muted rounded-xl p-3 transition-all duration-300 hover:scale-110 lg:hidden"
						>
							<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
						<div className="flex items-center gap-3">
							<div className="bg-accent h-3 w-3 animate-pulse rounded-full"></div>
							<h2 className="from-primary to-accent bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
								{currentConversation?.title || 'Select a conversation'}
							</h2>
						</div>
					</div>
				</div>

				<div className="from-background to-muted/20 flex-1 space-y-6 overflow-y-auto bg-gradient-to-br p-6">
					{currentConversation ? (
						<>
							{currentConversation.messages.map((message, index) => (
								<div
									key={message.id}
									className={`message-slide-in flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<div
										className={`premium-shadow max-w-[80%] rounded-2xl px-6 py-4 sm:max-w-[70%] ${
											message.sender === 'user'
												? 'from-primary to-accent bg-gradient-to-r text-white'
												: 'bg-card text-card-foreground border-border border'
										}`}
									>
										<p className="text-sm leading-relaxed">{message.content}</p>
										<p className="mt-2 text-xs font-medium opacity-70">
											{message.timestamp.toLocaleTimeString([], {
												hour: '2-digit',
												minute: '2-digit'
											})}
										</p>
									</div>
								</div>
							))}
							{isLoading && (
								<div className="message-slide-in flex justify-start">
									<div className="bg-card text-card-foreground border-border premium-shadow rounded-2xl border px-6 py-4">
										<div className="flex items-center gap-3">
											<div className="bg-primary h-3 w-3 animate-bounce rounded-full" />
											<div
												className="bg-accent h-3 w-3 animate-bounce rounded-full"
												style={{ animationDelay: '0.1s' }}
											/>
											<div
												className="bg-primary h-3 w-3 animate-bounce rounded-full"
												style={{ animationDelay: '0.2s' }}
											/>
											<span className="ml-2 text-sm font-medium">AI is thinking...</span>
										</div>
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</>
					) : (
						<div className="text-muted-foreground flex flex-1 items-center justify-center">
							<div className="float-animation text-center">
								<div className="from-primary to-accent mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r">
									<svg
										className="h-12 w-12 text-white"
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
								<p className="text-lg font-semibold">Select a conversation to start chatting</p>
								<p className="mt-2 text-sm opacity-70">
									Choose from your conversations or create a new one
								</p>
							</div>
						</div>
					)}
				</div>

				{currentConversation && (
					<div className="border-border glass-effect border-t p-6">
						<div className="flex gap-4">
							<div className="relative flex-1">
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
									placeholder="Type your message..."
									className="bg-input border-border focus:ring-primary premium-shadow w-full rounded-xl border px-6 py-4 text-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:outline-none"
									disabled={isLoading}
								/>
								<div className="shimmer-effect pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 focus-within:opacity-100"></div>
							</div>
							<button
								onClick={handleSendMessage}
								disabled={!newMessage.trim() || isLoading}
								className="from-primary to-accent premium-shadow pulse-glow rounded-xl bg-gradient-to-r px-6 py-4 text-white transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
							>
								<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
				)}
			</div>
		</div>
	);
};

const ConversationItem = ({
	conversation,
	isActive,
	onClick,
	onTogglePin
}: {
	conversation: Conversation;
	isActive: boolean;
	onClick: () => void;
	onTogglePin: (id: string, event: React.MouseEvent) => void;
}) => {
	return (
		<div
			onClick={onClick}
			className={`conversation-hover premium-shadow cursor-pointer rounded-xl p-4 ${
				isActive
					? 'from-primary/10 to-accent/10 border-primary/30 border-2 bg-gradient-to-r'
					: 'bg-sidebar-primary hover:bg-sidebar-primary/80 border-sidebar-border border'
			} `}
		>
			<div className="mb-2 flex items-start justify-between">
				<h4 className="flex-1 truncate text-sm font-semibold">{conversation.title}</h4>
				<div className="ml-3 flex items-center gap-2">
					<button
						onClick={(e) => onTogglePin(conversation.id, e)}
						className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 ${
							conversation.isPinned
								? 'from-primary to-accent pulse-glow bg-gradient-to-r text-white'
								: 'bg-sidebar-border hover:bg-primary/20 text-sidebar-foreground/50 hover:text-primary'
						} `}
						title={conversation.isPinned ? 'Unpin conversation' : 'Pin conversation'}
					>
						<svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
							<path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
						</svg>
					</button>
					{conversation.unread > 0 && (
						<div className="from-accent to-primary pulse-glow flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r text-xs font-bold text-white">
							{conversation.unread}
						</div>
					)}
				</div>
			</div>
			<p className="text-sidebar-foreground/70 mb-2 truncate text-xs leading-relaxed">
				{conversation.lastMessage}
			</p>
			<span className="text-sidebar-foreground/50 text-xs font-medium">{conversation.time}</span>
		</div>
	);
};

export default ChatInterface;
