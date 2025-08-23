'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

type OryntalTheme = 'aurora' | 'forest' | 'ocean' | 'sunset' | 'lavender';

interface OryntalThemeContextType {
	oryntalTheme: OryntalTheme;
	setOryntalTheme: (theme: OryntalTheme) => void;
}

const OryntalThemeContext = createContext<OryntalThemeContextType | undefined>(undefined);

export const useOryntalTheme = () => {
	const context = useContext(OryntalThemeContext);
	if (!context) {
		throw new Error('useOryntalTheme must be used within OryntalThemeProvider');
	}
	return context;
};

export const OryntalThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [oryntalTheme, setOryntalTheme] = useState<OryntalTheme>(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('oryntal-theme');
			if (saved && ['aurora', 'forest', 'ocean', 'sunset', 'lavender'].includes(saved)) {
				return saved as OryntalTheme;
			}
		}
		return 'aurora';
	});

	useEffect(() => {
		localStorage.setItem('oryntal-theme', oryntalTheme);
		document.documentElement.setAttribute('data-oryntal-theme', oryntalTheme);
	}, [oryntalTheme]);

	return (
		<OryntalThemeContext.Provider value={{ oryntalTheme, setOryntalTheme }}>
			{children}
		</OryntalThemeContext.Provider>
	);
};
