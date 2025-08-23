'use client';

import { useState, useRef } from 'react';

const ExpressionCanvas = () => {
	const [activeInterest, setActiveInterest] = useState<string | null>(null);
	const [particles, setParticles] = useState<
		Array<{ id: number; x: number; y: number; color: string }>
	>([]);
	const canvasRef = useRef<HTMLDivElement>(null);

	const interests = [
		{ name: 'Astronomy', color: 'from-blue-500 to-purple-600', emoji: '🌟' },
		{ name: 'Music Theory', color: 'from-green-500 to-teal-600', emoji: '🎵' },
		{ name: 'Linguistics', color: 'from-orange-500 to-red-600', emoji: '📚' },
		{ name: 'Mathematics', color: 'from-purple-500 to-pink-600', emoji: '∞' },
		{ name: 'Art History', color: 'from-yellow-500 to-orange-600', emoji: '🎨' },
		{ name: 'Botany', color: 'from-green-400 to-emerald-600', emoji: '🌿' }
	];

	const createParticle = (x: number, y: number, color: string) => {
		const newParticle = {
			id: Date.now() + Math.random(),
			x: x + (Math.random() - 0.5) * 100,
			y: y + (Math.random() - 0.5) * 100,
			color
		};
		setParticles((prev) => [...prev, newParticle]);
		setTimeout(() => {
			setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
		}, 2000);
	};

	return (
		<section className="bg-background relative overflow-hidden py-20">
			<div className="container mx-auto px-6">
				<div className="mb-16 text-center">
					<h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
						Your Interests Are
						<span className="from-primary to-secondary block bg-gradient-to-r bg-clip-text text-transparent">
							Your Superpowers
						</span>
					</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-xl">
						Click on any interest below to see how Oryntal celebrates the depth and passion of
						autistic minds
					</p>
				</div>

				<div
					ref={canvasRef}
					className="relative mx-auto mb-16 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-3"
				>
					{interests.map((interest, index) => (
						<div
							key={interest.name}
							className={`relative transform cursor-pointer rounded-3xl bg-gradient-to-br p-6 transition-all duration-500 hover:scale-105 ${interest.color} ${
								activeInterest === interest.name
									? 'scale-105 shadow-2xl'
									: 'shadow-lg hover:shadow-xl'
							}`}
							style={{
								animationDelay: `${index * 0.1}s`
							}}
							onClick={(e) => {
								setActiveInterest(interest.name);
								const rect = e.currentTarget.getBoundingClientRect();
								createParticle(
									rect.left + rect.width / 2,
									rect.top + rect.height / 2,
									interest.color
								);
								setTimeout(() => setActiveInterest(null), 3000);
							}}
						>
							<div className="text-center text-white">
								<div className="mb-3 text-4xl">{interest.emoji}</div>
								<h3 className="text-lg font-bold text-white drop-shadow-sm">{interest.name}</h3>
								{activeInterest === interest.name && (
									<div className="mt-3 animate-pulse text-sm text-white/90 drop-shadow-sm">
										✨ Exploring deep connections...
									</div>
								)}
							</div>
						</div>
					))}

					{/* Floating particles */}
					{particles.map((particle) => (
						<div
							key={particle.id}
							className="pointer-events-none absolute h-4 w-4 animate-ping rounded-full bg-gradient-to-r"
							style={{
								left: particle.x,
								top: particle.y,
								background: `linear-gradient(135deg, var(--oryntal-gradient-1), var(--oryntal-gradient-2))`
							}}
						/>
					))}
				</div>

				<div className="text-center">
					<p className="text-muted-foreground mx-auto max-w-3xl text-lg">
						Every special interest is a gateway to connection. Oryntal's AI companion learns about
						your passions and helps you find others who share your enthusiasm.
					</p>
				</div>
			</div>
		</section>
	);
};

export default ExpressionCanvas;
