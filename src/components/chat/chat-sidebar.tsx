'use client';
import { useState } from 'react';

interface Conversation {
	id: string;
	title: string;
	lastMessage: string;
	timestamp: string;
	isPinned: boolean;
}

interface ChatSidebarProps {
	activeConversation: string | null;
	onConversationSelect: (id: string) => void;
	collapsed: boolean;
	onToggleCollapse: () => void;
}

const ChatSidebar = ({ activeConversation, onConversationSelect, collapsed }: ChatSidebarProps) => {
	const [conversations] = useState<Conversation[]>([
		{
			id: '1',
			title: 'Project Planning Discussion',
			lastMessage: 'Let me help you create a comprehensive project plan...',
			timestamp: '2 min ago',
			isPinned: true
		},
		{
			id: '2',
			title: 'Code Review Assistant',
			lastMessage: 'I found several optimization opportunities in your code...',
			timestamp: '1 hour ago',
			isPinned: true
		},
		{
			id: '3',
			title: 'Marketing Strategy Ideas',
			lastMessage: 'Here are some innovative marketing approaches...',
			timestamp: '3 hours ago',
			isPinned: false
		},
		{
			id: '4',
			title: 'Technical Documentation',
			lastMessage: 'I can help you write clear and comprehensive docs...',
			timestamp: 'Yesterday',
			isPinned: false
		},
		{
			id: '5',
			title: 'Data Analysis Help',
			lastMessage: 'Based on your dataset, I notice these patterns...',
			timestamp: '2 days ago',
			isPinned: false
		}
	]);

	const pinnedConversations = conversations.filter((conv) => conv.isPinned);
	const regularConversations = conversations.filter((conv) => !conv.isPinned);

	const handleNewChat = () => {
		onConversationSelect('new');
	};

	if (collapsed) {
		return (
			<div className="bg-sidebar border-sidebar-border flex w-16 flex-col items-center gap-3 border-r py-4">
				<button
					onClick={handleNewChat}
					className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex h-12 w-12 items-center justify-center rounded-lg transition-colors"
					title="New Chat"
				>
					<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
					</svg>
				</button>
				<div className="bg-sidebar-border h-px w-8" />
				{conversations.slice(0, 6).map((conv) => (
					<button
						key={conv.id}
						onClick={() => onConversationSelect(conv.id)}
						className={`flex h-12 w-12 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
							activeConversation === conv.id
								? 'bg-sidebar-primary text-sidebar-primary-foreground'
								: 'bg-muted text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
						}`}
						title={conv.title}
					>
						{conv.title.charAt(0)}
					</button>
				))}
			</div>
		);
	}

	return (
		<div className="bg-sidebar border-sidebar-border flex w-80 flex-col border-r">
			<div className="border-sidebar-border border-b p-4">
				<button
					onClick={handleNewChat}
					className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors"
				>
					<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
					</svg>
					New Chat
				</button>
			</div>

			<div className="flex-1 overflow-y-auto">
				{pinnedConversations.length > 0 && (
					<div className="p-4">
						<div className="mb-3 flex items-center gap-2">
							<svg
								className="text-sidebar-foreground h-4 w-4"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M16 12V4H17V2C17 1.45 16.55 1 16 1H8C7.45 1 7 1.45 7 2V4H8V12L6 14V16H10.2L12 18L13.8 16H18V14L16 12Z" />
							</svg>
							<h3 className="text-sidebar-foreground text-sm font-medium">Pinned</h3>
						</div>
						<div className="space-y-2">
							{pinnedConversations.map((conversation) => (
								<ConversationItem
									key={conversation.id}
									conversation={conversation}
									isActive={activeConversation === conversation.id}
									onClick={() => onConversationSelect(conversation.id)}
									isPinned={true}
								/>
							))}
						</div>
					</div>
				)}

				<div className="p-4">
					<div className="mb-3 flex items-center gap-2">
						<svg
							className="text-sidebar-foreground h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h3 className="text-sidebar-foreground text-sm font-medium">Recent</h3>
					</div>
					<div className="space-y-2">
						{regularConversations.map((conversation) => (
							<ConversationItem
								key={conversation.id}
								conversation={conversation}
								isActive={activeConversation === conversation.id}
								onClick={() => onConversationSelect(conversation.id)}
								isPinned={false}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

const ConversationItem = ({
	conversation,
	isActive,
	onClick,
	isPinned
}: {
	conversation: Conversation;
	isActive: boolean;
	onClick: () => void;
	isPinned: boolean;
}) => {
	return (
		<button
			onClick={onClick}
			className={`group w-full rounded-lg p-3 text-left transition-colors ${
				isActive
					? 'bg-sidebar-primary text-sidebar-primary-foreground'
					: 'hover:bg-muted text-sidebar-foreground'
			}`}
		>
			<div className="mb-1 flex items-start justify-between">
				<div className="flex min-w-0 flex-1 items-center gap-2">
					{isPinned && (
						<svg
							className="h-3 w-3 flex-shrink-0 text-current"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M16 12V4H17V2C17 1.45 16.55 1 16 1H8C7.45 1 7 1.45 7 2V4H8V12L6 14V16H10.2L12 18L13.8 16H18V14L16 12Z" />
						</svg>
					)}
					<h4 className="truncate text-sm font-medium">{conversation.title}</h4>
				</div>
				<span
					className={`ml-2 flex-shrink-0 text-xs ${isActive ? 'text-sidebar-primary-foreground/70' : 'text-muted-foreground'}`}
				>
					{conversation.timestamp}
				</span>
			</div>
			<p
				className={`line-clamp-2 text-xs leading-relaxed ${isActive ? 'text-sidebar-primary-foreground/80' : 'text-muted-foreground'}`}
			>
				{conversation.lastMessage}
			</p>
		</button>
	);
};

export default ChatSidebar;
