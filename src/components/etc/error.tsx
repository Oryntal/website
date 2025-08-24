'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCw, MessageSquareMore } from 'lucide-react';

interface ButtonProps {
	label: string;
	onClick: () => void;
}

interface ErrorPageProps {
	status?: number;
	message?: string;
	subtext?: string;
	button?: ButtonProps | null;
}

const ErrorComp: React.FC<ErrorPageProps> = ({
	status = 404,
	message = 'Page Not Found',
	subtext = "Sorry, we couldn't find the page you're looking for.",
	button = null
}) => {
	const [mounted, setMounted] = useState(false);
	const [hoverButton, setHoverButton] = useState(false);
	const [particlesVisible, setParticlesVisible] = useState(false);

	useEffect(() => {
		setMounted(true);
		const timer = setTimeout(() => setParticlesVisible(true), 800);
		return () => clearTimeout(timer);
	}, []);

	// Generate random particles for the background effect
	const particles = Array.from({ length: 20 }).map((_, i) => ({
		id: i,
		x: Math.random() * 100,
		y: Math.random() * 100,
		size: Math.random() * 10 + 5,
		duration: Math.random() * 20 + 10,
		delay: Math.random() * 5
	}));

	// Split the status code into individual digits for animation
	const statusDigits = String(status).split('');

	return (
		<div className="from-background via-background to-background/90 relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br">
			{/* Animated background elements */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="bg-grid-pattern absolute top-0 left-0 h-full w-full opacity-[0.03]" />

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.6 }}
					transition={{ duration: 2 }}
					className="bg-primary/20 absolute top-1/4 -left-20 h-60 w-60 rounded-full blur-[100px]"
				/>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.5 }}
					transition={{ duration: 2, delay: 0.5 }}
					className="bg-primary/20 absolute -right-20 bottom-1/4 h-60 w-60 rounded-full blur-[100px]"
				/>

				{/* Animated particles */}
				<AnimatePresence>
					{particlesVisible &&
						particles.map((particle) => (
							<motion.div
								key={particle.id}
								initial={{ opacity: 0 }}
								animate={{
									opacity: [0, 0.5, 0],
									y: [0, -30],
									x: [0, particle.id % 2 === 0 ? 10 : -10]
								}}
								transition={{
									duration: particle.duration,
									repeat: Number.POSITIVE_INFINITY,
									delay: particle.delay,
									ease: 'easeInOut'
								}}
								className="bg-primary/10 absolute rounded-full"
								style={{
									left: `${particle.x}%`,
									top: `${particle.y}%`,
									width: `${particle.size}px`,
									height: `${particle.size}px`
								}}
							/>
						))}
				</AnimatePresence>
			</div>

			<div className="relative z-10 container px-4 py-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mx-auto max-w-3xl"
				>
					{/* Glowing status code */}
					<div className="mb-12 flex justify-center">
						<div className="relative">
							{/* Glowing effect behind the numbers */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: [0.5, 0.8, 0.5], scale: 1 }}
								transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
								className="bg-primary/20 absolute inset-0 rounded-2xl blur-xl"
							/>

							<div className="border-primary/10 relative flex items-center justify-center rounded-2xl border bg-black/20 px-8 py-6 backdrop-blur-sm">
								{statusDigits.map((digit, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.1 * index }}
										className="mx-1 text-7xl font-bold text-white sm:mx-2"
									>
										{digit}
									</motion.div>
								))}

								<motion.div
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: 0.5 }}
									className="bg-primary text-primary-foreground absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
								>
									<AlertCircle className="h-5 w-5" />
								</motion.div>
							</div>
						</div>
					</div>

					{/* Message content */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-center"
					>
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							className="text-foreground mb-4 text-4xl font-bold tracking-tight"
						>
							{message}
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.8 }}
							className="text-muted-foreground mx-auto mb-8 max-w-lg text-lg"
						>
							{subtext}
						</motion.p>

						{/* Action buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 1 }}
							className="flex flex-col justify-center gap-4 sm:flex-row"
						>
							{button ? (
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Button
										size="lg"
										onClick={button.onClick}
										className="group relative overflow-hidden"
										onMouseEnter={() => setHoverButton(true)}
										onMouseLeave={() => setHoverButton(false)}
									>
										<motion.span
											initial={{ width: '0%' }}
											animate={{ width: hoverButton ? '100%' : '0%' }}
											transition={{ duration: 0.3 }}
											className="bg-primary-foreground/10 absolute inset-0"
										/>
										<span className="relative z-10 flex items-center">
											{button.label}
											<motion.span
												animate={{ rotate: hoverButton ? 360 : 0 }}
												transition={{ duration: 0.5 }}
											>
												<RefreshCw className="ml-2 h-4 w-4" />
											</motion.span>
										</span>
									</Button>
								</motion.div>
							) : (
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
									<Link href="/">
										<Button size="lg" variant="default" className="group relative overflow-hidden">
											<motion.span
												initial={{ width: '0%' }}
												whileHover={{ width: '100%' }}
												transition={{ duration: 0.3 }}
												className="bg-primary-foreground/10 absolute inset-0"
											/>
											<span className="relative z-10 flex items-center">
												Back to Home
												<motion.span
													whileHover={{ x: -3, y: 3 }}
													transition={{
														repeat: Number.POSITIVE_INFINITY,
														repeatType: 'mirror',
														duration: 0.5
													}}
												>
													<Home className="ml-2 h-4 w-4" />
												</motion.span>
											</span>
										</Button>
									</Link>
								</motion.div>
							)}

							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Link href="/contact">
									<Button
										size="lg"
										variant="outline"
										className="group border-primary/20 relative overflow-hidden backdrop-blur-sm"
									>
										<motion.span
											initial={{ opacity: 0 }}
											whileHover={{ opacity: 0.1 }}
											transition={{ duration: 0.3 }}
											className="bg-primary absolute inset-0"
										/>
										<span className="relative z-10 flex items-center">
											Contact Support
											<motion.span
												whileHover={{ y: [0, -3, 0] }}
												transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
											>
												<MessageSquareMore className="ml-2 h-4 w-4" />
											</motion.span>
										</span>
									</Button>
								</Link>
							</motion.div>
						</motion.div>
					</motion.div>

					{/* Footer message */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 1.2 }}
						className="mt-16 text-center"
					>
						<div className="border-primary/10 inline-block rounded-full border bg-black/10 px-6 py-2 backdrop-blur-sm">
							<p className="text-muted-foreground text-sm">
								If you believe this is an error, please contact our support team.
							</p>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default ErrorComp;
