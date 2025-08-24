import type React from 'react';
import generateMetadata from '@/components/etc/seo';
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

export const metadata = generateMetadata({
	title: 'Oryntal AI - Your Safe Space for Expression',
	description:
		'Oryntal AI by Purrquinox is an AI-powered community designed for autistic people to explore passions, express themselves, and connect in a safe, inclusive space built for belonging.'
});

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
