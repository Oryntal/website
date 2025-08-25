'use client';

import { useState } from 'react';
import ChatInterface from '@/components/chat/chat-interface';
import ThemeToggle from '@/components/themes/theme-toggle';

const Chat = () => {
	const [activeConversation, setActiveConversation] = useState<string | null>(null);

	return (
		<div className="bg-background text-foreground min-h-screen">
			<header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
				<div className="mx-auto flex max-w-7xl items-center justify-between p-4">
					<div className="flex items-center gap-3">
						<div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
							<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
							</svg>
						</div>
						<h1 className="text-xl font-bold">Oryntal AI</h1>
					</div>
					<ThemeToggle />
				</div>
			</header>

			<main className="mx-auto max-w-7xl p-4">
				<ChatInterface
					activeConversation={activeConversation}
					onConversationSelect={setActiveConversation}
				/>
			</main>
		</div>
	);
};

export default Chat;
