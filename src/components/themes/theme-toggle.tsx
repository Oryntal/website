'use client';

import { useTheme } from 'next-themes';
import { useOryntalTheme } from './theme-provider';
import { useEffect, useState } from 'react';

type Palette = {
	name: 'aurora' | 'forest' | 'ocean' | 'sunset' | 'lavender';
	label: string;
	colors: string[];
};

const oryntalThemes: Palette[] = [
	{ name: 'aurora', label: 'Aurora', colors: ['#ff6b9d', '#c44569', '#6c5ce7'] },
	{ name: 'forest', label: 'Forest', colors: ['#00b894', '#00a085', '#55a3ff'] },
	{ name: 'ocean', label: 'Ocean', colors: ['#0984e3', '#74b9ff', '#00cec9'] },
	{ name: 'sunset', label: 'Sunset', colors: ['#fd79a8', '#fdcb6e', '#e17055'] },
	{ name: 'lavender', label: 'Lavender', colors: ['#a29bfe', '#6c5ce7', '#fd79a8'] }
];

const ThemeToggle = () => {
	const [mounted, setMounted] = useState(false);
	const [showThemes, setShowThemes] = useState(false);
	const { theme, setTheme } = useTheme();
	const { oryntalTheme, setOryntalTheme } = useOryntalTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="fixed top-6 right-6 z-50">
			{showThemes && (
				<div className="bg-card/90 border-border mb-4 rounded-2xl border p-4 shadow-lg backdrop-blur-sm">
					<div className="text-foreground mb-3 text-sm font-medium">Choose Your Palette</div>
					<div className="grid grid-cols-1 gap-2">
						{oryntalThemes.map((t) => (
							<button
								key={t.name}
								onClick={() => {
									setOryntalTheme(t.name);
									setShowThemes(false);
								}}
								className={`hover:bg-muted/50 flex items-center gap-3 rounded-lg p-2 transition-all ${
									oryntalTheme === t.name ? 'bg-muted ring-primary ring-2' : ''
								}`}
								aria-label={`Select ${t.label} palette`}
							>
								<div className="flex gap-1">
									{t.colors.map((color, i) => (
										<div
											key={i}
											className="h-4 w-4 rounded-full"
											style={{ backgroundColor: color }}
										/>
									))}
								</div>
								<span className="text-foreground text-sm">{t.label}</span>
							</button>
						))}
					</div>
				</div>
			)}

			<div className="flex gap-2">
				{/* Palette toggle */}
				<button
					onClick={() => setShowThemes(!showThemes)}
					className="bg-card/80 border-border hover:bg-card rounded-full border p-3 backdrop-blur-sm transition-all duration-300"
					aria-label="Choose color theme"
				>
					<div className="flex h-6 w-6 gap-0.5">
						<div
							className="h-6 w-2 rounded-l-full"
							style={{ background: `var(--oryntal-gradient-1)` }}
						/>
						<div className="h-6 w-2" style={{ background: `var(--oryntal-gradient-2)` }} />
						<div
							className="h-6 w-2 rounded-r-full"
							style={{ background: `var(--oryntal-gradient-3)` }}
						/>
					</div>
				</button>

				{/* Dark/Light toggle */}
				<button
					onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					className="bg-card/80 border-border hover:bg-card group rounded-full border p-3 backdrop-blur-sm transition-all duration-300"
					aria-label="Toggle light/dark mode"
				>
					<div className="relative h-6 w-6">
						{/* Sun */}
						<svg
							className={`text-foreground absolute inset-0 h-6 w-6 transition-all duration-300 ${
								theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
							}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
						{/* Moon */}
						<svg
							className={`text-foreground absolute inset-0 h-6 w-6 transition-all duration-300 ${
								theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
							}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
							/>
						</svg>
					</div>
				</button>
			</div>
		</div>
	);
};

export default ThemeToggle;
