import type React from 'react';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Manrope } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { OryntalThemeProvider } from '../components/themes/theme-provider';
import './globals.css';

const geist = Geist({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-geist'
});

const manrope = Manrope({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-manrope'
});

export const metadata: Metadata = {
	title: 'Oryntal - Your Safe Space for Expression',
	description:
		'AI-powered platform for autistic people to express themselves, share special interests, and connect authentically.'
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geist.variable} ${manrope.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<OryntalThemeProvider>{children}</OryntalThemeProvider>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
