'use client';

import { useState } from 'react';

const AccessibilityFirst = () => {
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);

	const principles = [
		{
			title: 'Sensory Considerations',
			description: 'Reduced motion, customizable themes, and gentle transitions',
			icon: '👁️',
			features: [
				'Reduced motion options',
				'High contrast modes',
				'Customizable color themes',
				'Gentle animations'
			]
		},
		{
			title: 'Clear Communication',
			description: 'Direct language, consistent patterns, and predictable interactions',
			icon: '💬',
			features: [
				'Plain language',
				'Consistent UI patterns',
				'Clear navigation',
				'Predictable responses'
			]
		},
		{
			title: 'Flexible Interaction',
			description: 'Multiple ways to engage, at your own pace and comfort level',
			icon: '⚡',
			features: [
				'Keyboard navigation',
				'Voice input options',
				'Flexible pacing',
				'Multiple input methods'
			]
		},
		{
			title: 'Privacy & Control',
			description: 'Complete control over your data, sharing, and interactions',
			icon: '🔒',
			features: ['Private by default', 'Granular sharing controls', 'Data ownership', 'No tracking']
		}
	];

	return (
		<section className="from-background to-card bg-gradient-to-b py-20">
			<div className="container mx-auto px-6">
				<div className="mb-16 text-center">
					<h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">
						Accessibility
						<span className="from-primary to-secondary block bg-gradient-to-r bg-clip-text text-transparent">
							Isn't an Afterthought
						</span>
					</h2>
					<p className="text-muted-foreground mx-auto max-w-3xl text-xl">
						Every feature, every interaction, every design decision is made with neurodivergent
						users at the center.
					</p>
				</div>

				<div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
					{principles.map((principle, index) => (
						<div
							key={index}
							className={`relative cursor-pointer rounded-3xl p-8 transition-all duration-500 ${
								hoveredCard === index
									? 'from-primary to-secondary text-primary-foreground scale-105 bg-gradient-to-br shadow-2xl'
									: 'bg-card text-card-foreground border-border border shadow-lg hover:shadow-xl'
							}`}
							onMouseEnter={() => setHoveredCard(index)}
							onMouseLeave={() => setHoveredCard(null)}
						>
							<div className="mb-6 text-5xl">{principle.icon}</div>
							<h3 className="mb-4 text-2xl font-bold">{principle.title}</h3>
							<p
								className={`mb-6 text-lg ${hoveredCard === index ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}
							>
								{principle.description}
							</p>

							<div className="space-y-3">
								{principle.features.map((feature, featureIndex) => (
									<div
										key={featureIndex}
										className={`flex items-center gap-3 rounded-xl p-3 transition-all duration-300 ${
											hoveredCard === index
												? 'bg-primary-foreground/10 backdrop-blur-sm'
												: 'bg-muted/50'
										}`}
									>
										<div
											className={`h-2 w-2 rounded-full ${hoveredCard === index ? 'bg-primary-foreground' : 'bg-primary'}`}
										></div>
										<span
											className={`font-medium ${hoveredCard === index ? 'text-primary-foreground' : 'text-foreground'}`}
										>
											{feature}
										</span>
									</div>
								))}
							</div>

							{hoveredCard === index && (
								<div className="bg-accent absolute -top-2 -right-2 h-6 w-6 animate-ping rounded-full"></div>
							)}
						</div>
					))}
				</div>

				<div className="mt-16 text-center">
					<div className="from-primary/10 to-secondary/10 border-border inline-flex items-center gap-4 rounded-2xl border bg-gradient-to-r p-6">
						<div className="text-3xl">✨</div>
						<div className="text-left">
							<h3 className="text-foreground text-lg font-bold">Built by autistic developers</h3>
							<p className="text-muted-foreground">
								Who understand the importance of getting it right
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AccessibilityFirst;
