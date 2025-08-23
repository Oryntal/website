'use client';

import { useState, useEffect } from 'react';

const AICompanionDemo = () => {
	const [currentMessage, setCurrentMessage] = useState(0);
	const [isTyping, setIsTyping] = useState(false);

	const conversation = [
		{
			user: "I've been really into crystallography lately...",
			ai: "That's fascinating! The geometric precision of crystal structures is incredible. What drew you to crystallography specifically?",
			mood: 'curious'
		},
		{
			user: 'The symmetry patterns are so satisfying to study',
			ai: 'I can see why that would be deeply satisfying! The mathematical beauty in crystal lattices is remarkable. Have you explored any particular crystal systems that especially captivate you?',
			mood: 'engaged'
		},
		{
			user: 'Hexagonal systems are my favorite right now',
			ai: 'Hexagonal systems have such elegant symmetry! The way quartz and beryl form those perfect six-sided structures... Would you like to explore how other community members have documented their crystal collections?',
			mood: 'supportive'
		}
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setIsTyping(true);
			setTimeout(() => {
				setCurrentMessage((prev) => (prev + 1) % conversation.length);
				setIsTyping(false);
			}, 1500);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="bg-background py-20">
			<div className="container mx-auto px-6">
				<div className="mx-auto max-w-4xl">
					<div className="mb-16 text-center">
						<h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
							Meet Your AI Companion
						</h2>
						<p className="text-muted-foreground mx-auto max-w-2xl text-xl">
							Not just another chatbot. A companion that remembers, learns, and grows with your
							interests.
						</p>
					</div>

					{/* Chat interface mockup */}
					<div className="bg-card border-border mx-auto max-w-2xl overflow-hidden rounded-3xl border shadow-2xl">
						<div className="from-primary to-secondary text-primary-foreground bg-gradient-to-r p-4">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
									<div className="h-6 w-6 rounded-full bg-white"></div>
								</div>
								<div>
									<h3 className="font-bold">Oryntal AI</h3>
									<p className="text-sm opacity-90">Always here to listen and learn</p>
								</div>
								<div className="ml-auto flex gap-1">
									<div className="bg-accent h-3 w-3 animate-pulse rounded-full"></div>
								</div>
							</div>
						</div>

						<div className="bg-card h-96 space-y-4 overflow-hidden p-6">
							{conversation.slice(0, currentMessage + 1).map((msg, index) => (
								<div key={index} className="space-y-3">
									{/* User message */}
									<div className="flex justify-end">
										<div className="bg-muted max-w-xs rounded-2xl rounded-tr-md px-4 py-3">
											<p className="text-foreground">{msg.user}</p>
										</div>
									</div>

									{/* AI response */}
									<div className="flex justify-start">
										<div className="from-primary to-secondary text-primary-foreground max-w-sm rounded-2xl rounded-tl-md bg-gradient-to-r px-4 py-3">
											<p>{msg.ai}</p>
											<div className="mt-2 flex items-center gap-2 text-xs opacity-75">
												<div
													className={`h-2 w-2 rounded-full ${
														msg.mood === 'curious'
															? 'bg-accent'
															: msg.mood === 'engaged'
																? 'bg-accent'
																: 'bg-accent'
													}`}
												></div>
												<span>{msg.mood}</span>
											</div>
										</div>
									</div>
								</div>
							))}

							{isTyping && (
								<div className="flex justify-start">
									<div className="from-primary to-secondary text-primary-foreground rounded-2xl rounded-tl-md bg-gradient-to-r px-4 py-3">
										<div className="flex gap-1">
											<div className="bg-primary-foreground h-2 w-2 animate-bounce rounded-full"></div>
											<div
												className="bg-primary-foreground h-2 w-2 animate-bounce rounded-full"
												style={{ animationDelay: '0.1s' }}
											></div>
											<div
												className="bg-primary-foreground h-2 w-2 animate-bounce rounded-full"
												style={{ animationDelay: '0.2s' }}
											></div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="mt-12 text-center">
						<div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-3">
							<div className="text-center">
								<div className="from-accent to-secondary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
									<span className="text-2xl">🧠</span>
								</div>
								<h3 className="text-foreground mb-2 text-lg font-bold">Remembers Everything</h3>
								<p className="text-muted-foreground">
									Your interests, preferences, and conversation history
								</p>
							</div>
							<div className="text-center">
								<div className="from-primary to-accent mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
									<span className="text-2xl">❓</span>
								</div>
								<h3 className="text-foreground mb-2 text-lg font-bold">Asks Great Questions</h3>
								<p className="text-muted-foreground">Helps you explore your thoughts more deeply</p>
							</div>
							<div className="text-center">
								<div className="from-secondary to-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
									<span className="text-2xl">🌱</span>
								</div>
								<h3 className="text-foreground mb-2 text-lg font-bold">Grows With You</h3>
								<p className="text-muted-foreground">
									Adapts to your communication style and needs
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AICompanionDemo;
