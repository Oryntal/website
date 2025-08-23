'use client';

import { useState } from 'react';

const InteractiveFeatures = () => {
	const [activeFeature, setActiveFeature] = useState(0);

	const features = [
		{
			title: 'Private Journaling',
			description: 'Your thoughts, your space. Write freely without judgment.',
			icon: '📝',
			color: 'from-blue-500 to-cyan-600',
			details:
				'Express yourself in a completely private space. Your journal is yours alone, with optional AI insights to help you reflect and grow.'
		},
		{
			title: 'Special Interest Sharing',
			description: 'Connect with others who share your passions.',
			icon: '🎯',
			color: 'from-purple-500 to-pink-600',
			details:
				'Share your deep dives into topics you love. Find others who appreciate the same level of detail and enthusiasm.'
		},
		{
			title: 'Sensory-Friendly Design',
			description: 'Built to reduce overwhelm and maximize comfort.',
			icon: '🎨',
			color: 'from-green-500 to-teal-600',
			details:
				'Every element designed with sensory processing in mind. Customizable themes, reduced motion options, and clear visual hierarchy.'
		},
		{
			title: 'Community Feed',
			description: "Optional sharing when you're ready to connect.",
			icon: '🌐',
			color: 'from-orange-500 to-red-600',
			details:
				'Share your interests and discoveries with a supportive community. Complete control over what you share and when.'
		}
	];

	return (
		<section className="bg-background py-20">
			<div className="container mx-auto px-6">
				<div className="mb-16 text-center">
					<h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
						Features Built for
						<span className="from-primary to-secondary block bg-gradient-to-r bg-clip-text text-transparent">
							Authentic Expression
						</span>
					</h2>
				</div>

				<div className="mx-auto max-w-6xl">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						{/* Feature selector */}
						<div className="space-y-4">
							{features.map((feature, index) => (
								<div
									key={index}
									className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
										activeFeature === index
											? 'from-primary to-secondary text-primary-foreground scale-105 bg-gradient-to-r shadow-2xl'
											: 'bg-card hover:bg-muted text-foreground border-border border'
									}`}
									onClick={() => setActiveFeature(index)}
								>
									<div className="flex items-center gap-4">
										<div className={`text-3xl ${activeFeature === index ? '' : 'opacity-70'}`}>
											{feature.icon}
										</div>
										<div>
											<h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
											<p
												className={`${activeFeature === index ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}
											>
												{feature.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Feature details */}
						<div className="lg:pl-8">
							<div
								className={`from-primary to-secondary text-primary-foreground transform rounded-3xl bg-gradient-to-br p-8 shadow-2xl transition-all duration-500`}
							>
								<div className="mb-6 text-6xl opacity-20">{features[activeFeature].icon}</div>
								<h3 className="mb-4 text-3xl font-bold">{features[activeFeature].title}</h3>
								<p className="text-primary-foreground/90 text-lg leading-relaxed">
									{features[activeFeature].details}
								</p>

								{/* Interactive element */}
								<div className="mt-8 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
									<div className="flex items-center gap-3">
										<div className="bg-accent h-3 w-3 animate-pulse rounded-full"></div>
										<span className="text-sm font-medium">
											{activeFeature === 0 && 'Your private space awaits...'}
											{activeFeature === 1 && 'Finding your community...'}
											{activeFeature === 2 && 'Optimizing for comfort...'}
											{activeFeature === 3 && 'Building connections...'}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default InteractiveFeatures;
