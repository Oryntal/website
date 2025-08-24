import type { Metadata } from 'next';

const defaultLogo = '/logo.png';
const defaultBanner = '/banner.png';

const generateMetadata = ({
	title = 'Oryntal AI - Your Safe Space for Expression',
	description = 'Oryntal AI by Purrquinox is an AI-powered community designed for autistic people to explore passions, express themselves, and connect in a safe, inclusive space built for belonging.',
	logo = defaultLogo,
	banner = defaultBanner
}: {
	title?: string;
	description?: string;
	logo?: string;
	banner?: string;
}): Metadata => {
	const url = 'https://oryntal.xyz';

	return {
		title,
		description,
		keywords: [
			'oryntal',
			'purrquinox',
			'belonging',
			'safe space',
			'neurodiversity',
			'autism support',
			'expression',
			'interests',
			'passions',
			'connection',
			'understanding',
			'supportive AI',
			'gentle correction',
			'accessibility-first',
			'community',
			'authenticity',
			'inclusive design'
		],
		manifest: '/manifest.json',
		metadataBase: new URL(url),
		alternates: {
			canonical: url
		},
		applicationName: 'Oryntal',
		authors: [{ name: 'Purrquinox' }],
		openGraph: {
			title,
			description,
			url,
			siteName: 'Oryntal',
			type: 'website',
			images: [
				{
					url: banner,
					width: 1200,
					height: 630,
					alt: 'Oryntal AI Banner'
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [banner],
			creator: '@heypurrquinox'
		},
		icons: {
			icon: { url: logo, type: 'image/png', sizes: '512x512' },
			apple: { url: logo }
		},
		other: {
			sitemap: '/sitemap.xml',
			image: banner,
			'apple-mobile-web-app-status-bar': '#BCA7E8'
		}
	};
};

export default generateMetadata;
