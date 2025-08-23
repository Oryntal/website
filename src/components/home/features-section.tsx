'use client';

import { useState, useEffect, useRef } from 'react';

const features = [
	{
		title: 'AI Companion That Understands',
		description:
			'Your personal AI companion remembers your interests, asks thoughtful questions, and provides gentle challenges to help you grow.',
		icon: '🤖',
		color: 'primary'
	},
	{
		title: 'Private Journaling Space',
		description:
			'Express yourself freely in a safe, private environment designed to minimize sensory overload and maximize comfort.',
		icon: '📝',
		color: 'secondary'
	},
	{
		title: 'Share Your Special Interests',
		description:
			'Connect with others who appreciate your passions. Share what you love in a community that truly understands.',
		icon: '✨',
		color: 'accent'
	},
	{
		title: 'Accessible Design',
		description:
			'Every element is crafted with accessibility in mind, ensuring a comfortable experience for all neurotypes.',
		icon: '♿',
		color: 'primary'
	}
];

const FeaturesSection = () => {
	const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([]);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setVisibleFeatures(new Array(features.length).fill(true));
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section ref={sectionRef} className="bg-background py-24">
			<div className="mx-auto max-w-6xl px-6">
				<div className="mb-16 text-center">
					<h2 className="text-foreground mb-6 font-sans text-4xl font-bold md:text-5xl">
						Designed for <span className="text-primary">Your Needs</span>
					</h2>
					<p className="text-muted-foreground mx-auto max-w-3xl font-serif text-xl leading-relaxed">
						Every feature is thoughtfully crafted to create a supportive environment where you can
						be authentically yourself.
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					{features.map((feature, index) => (
						<div
							key={index}
							className={`group bg-card hover:bg-muted/50 border-border rounded-xl border p-8 transition-all duration-500 hover:scale-105 hover:shadow-lg ${
								visibleFeatures[index] ? 'animate-gentle-fade-in' : 'opacity-0'
							}`}
							style={{ animationDelay: `${index * 0.2}s` }}
						>
							<div className="flex items-start gap-4">
								<div
									className={`rounded-lg p-3 text-4xl bg-${feature.color}/10 transition-transform duration-300 group-hover:scale-110`}
								>
									{feature.icon}
								</div>
								<div className="flex-1">
									<h3 className="text-card-foreground mb-3 font-sans text-xl font-semibold">
										{feature.title}
									</h3>
									<p className="text-muted-foreground font-serif leading-relaxed">
										{feature.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
