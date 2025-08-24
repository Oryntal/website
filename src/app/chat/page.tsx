'use client';
import { useState } from 'react';
import ChatSidebar from '@/components/chat/chat-sidebar';
import ChatArea from '@/components/chat/chat-area';
import ThemeToggle from '@/components/themes/theme-toggle';

const Chat = () => {
	const [activeConversation, setActiveConversation] = useState<string | null>(null);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	return (
		<div className="bg-background text-foreground flex h-screen">
			<ChatSidebar
				activeConversation={activeConversation}
				onConversationSelect={setActiveConversation}
				collapsed={sidebarCollapsed}
				onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
			/>
			<div className="flex flex-1 flex-col">
				<header className="bg-card text-card-foreground border-border flex items-center justify-between border-b px-6 py-4">
					<div className="flex items-center gap-4">
						<button
							onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
							className="hover:bg-muted rounded-lg p-2 transition-colors"
						>
							<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
						<div className="flex items-center gap-3">
							<div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
								<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
								</svg>
							</div>
							<h1 className="text-xl font-semibold tracking-tight">Oryntal AI</h1>
						</div>
					</div>
					<div className="flex items-center">
						<ThemeToggle />
					</div>
				</header>
				<ChatArea activeConversation={activeConversation} />
			</div>
		</div>
	);
};

export default Chat;
