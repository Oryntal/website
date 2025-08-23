'use client';

import type React from 'react';
import { useState } from 'react';

const JoinMovement = () => {
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitted(true);
		// Handle email submission
	};

	return (
		<section className="from-primary via-secondary to-accent relative overflow-hidden bg-gradient-to-br py-20">
			{/* Background elements */}
			<div className="absolute inset-0">
				<div className="bg-primary-foreground/10 absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full blur-3xl"></div>
				<div
					className="bg-primary-foreground/5 absolute right-1/4 bottom-1/4 h-48 w-48 animate-pulse rounded-full blur-2xl"
					style={{ animationDelay: '1s' }}
				></div>
			</div>

			<div className="relative z-10 container mx-auto px-6 text-center">
				<div className="mx-auto max-w-4xl">
					<h2 className="text-primary-foreground mb-8 text-4xl font-bold md:text-6xl">
						Join the Movement for
						<span className="block">Authentic Expression</span>
					</h2>
					<p className="text-primary-foreground/90 mx-auto mb-12 max-w-3xl text-xl leading-relaxed md:text-2xl">
						Be part of creating the first platform truly designed for autistic minds. Your voice
						matters in shaping a more understanding world.
					</p>

					{!isSubmitted ? (
						<form onSubmit={handleSubmit} className="mx-auto mb-12 max-w-md">
							<div className="flex flex-col gap-4 sm:flex-row">
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Enter your email"
									className="bg-background text-foreground focus:ring-primary-foreground/30 border-border flex-1 rounded-2xl border px-6 py-4 font-medium focus:ring-4 focus:outline-none"
									required
								/>
								<button
									type="submit"
									className="bg-background text-primary hover:bg-muted rounded-2xl px-8 py-4 font-bold transition-all duration-300 hover:scale-105"
								>
									Join Waitlist
								</button>
							</div>
						</form>
					) : (
						<div className="bg-primary-foreground/10 border-primary-foreground/20 mx-auto mb-12 max-w-md rounded-2xl border p-6 backdrop-blur-sm">
							<div className="mb-4 text-4xl">🎉</div>
							<h3 className="text-primary-foreground mb-2 text-2xl font-bold">
								Welcome to the movement!
							</h3>
							<p className="text-primary-foreground/90">
								We'll keep you updated on our progress and early access opportunities.
							</p>
						</div>
					)}

					<div className="text-primary-foreground grid gap-8 md:grid-cols-2">
						<div className="text-center">
							<div className="mb-4 text-4xl">🚀</div>
							<h3 className="mb-2 text-xl font-bold">Early Access</h3>
							<p className="text-primary-foreground/80">Be among the first to experience Oryntal</p>
						</div>

						<div className="text-center">
							<div className="mb-4 text-4xl">🎯</div>
							<h3 className="mb-2 text-xl font-bold">Shape the Future</h3>
							<p className="text-primary-foreground/80">
								Your feedback helps us build something amazing
							</p>
						</div>
					</div>

					<div className="border-primary-foreground/20 mt-16 border-t pt-8">
						<p className="text-primary-foreground/70 text-sm">
							Made with 💜 by Purrquinox • Building bridges, not barriers
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default JoinMovement;
