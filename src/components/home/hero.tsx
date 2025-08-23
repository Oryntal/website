'use client';

import { useState, useEffect } from 'react';

const Hero = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<section className="from-background via-muted/30 to-card relative min-h-screen overflow-hidden bg-gradient-to-br">
			{/* Dynamic background orbs that follow mouse */}
			<div
				className="from-primary/20 to-secondary/20 absolute h-96 w-96 rounded-full bg-gradient-to-r opacity-60 blur-3xl transition-all duration-1000 ease-out"
				style={{
					transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
					left: '10%',
					top: '20%'
				}}
			/>
			<div
				className="from-accent/25 to-primary/25 absolute h-64 w-64 rounded-full bg-gradient-to-r opacity-70 blur-2xl transition-all duration-700 ease-out"
				style={{
					transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
					right: '15%',
					bottom: '30%'
				}}
			/>

			<div className="relative z-10 container mx-auto px-6 py-20">
				<div
					className={`text-center transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
				>
					{/* Unique brand presentation */}
					<div className="mb-12">
						<div className="mb-6 inline-flex items-center gap-3">
							<h1 className="from-primary via-secondary to-accent bg-gradient-to-r bg-clip-text text-6xl font-black text-transparent md:text-8xl">
								Oryntal
							</h1>
						</div>
						<p className="text-muted-foreground text-lg font-medium">by Purrquinox</p>
					</div>

					{/* Unique value proposition */}
					<div className="mx-auto mb-16 max-w-4xl">
						<h2 className="text-foreground mb-8 text-4xl leading-tight font-bold md:text-6xl">
							Where Your Mind
							<span className="from-primary to-secondary block bg-gradient-to-r bg-clip-text text-transparent">
								Finds Its Voice
							</span>
						</h2>
						<p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl">
							The first AI platform built by and for autistic minds. Express your special interests,
							connect authentically, and discover a community that truly gets you.
						</p>
					</div>

					{/* Interactive CTA */}
					<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
						<button className="group bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
							<span className="relative z-10">Begin Your Journey</span>
							<div className="from-secondary to-accent absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
						</button>
						<button className="border-border text-foreground hover:border-primary hover:text-primary rounded-2xl border-2 px-8 py-4 text-lg font-bold transition-all duration-300">
							Explore Features
						</button>
					</div>
				</div>

				{/* Floating elements */}
				<div
					className="absolute top-1/4 left-8 animate-bounce"
					style={{ animationDelay: '0s', animationDuration: '3s' }}
				>
					<div className="from-accent to-primary h-16 w-16 rotate-12 transform rounded-2xl bg-gradient-to-br opacity-70"></div>
				</div>
				<div
					className="absolute top-1/3 right-12 animate-bounce"
					style={{ animationDelay: '1s', animationDuration: '4s' }}
				>
					<div className="from-secondary to-accent h-12 w-12 rounded-full bg-gradient-to-br opacity-60"></div>
				</div>
				<div
					className="absolute bottom-1/4 left-1/4 animate-bounce"
					style={{ animationDelay: '2s', animationDuration: '5s' }}
				>
					<div className="from-primary to-secondary h-20 w-20 -rotate-12 transform rounded-3xl bg-gradient-to-br opacity-50"></div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
