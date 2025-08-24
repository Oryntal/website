import type { Metadata } from 'next';

const logo = '/logo.png';

const generateMetadata = ({
	title = 'Oryntal AI - Your Safe Space for Expression',
	description = 'Oryntal AI by Purrquinox is an AI-powered community designed for autistic people to explore passions, express themselves, and connect in a safe, inclusive space built for belonging.',
	image = null
}: {
	title?: string;
	description?: string;
	image?: string | null;
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
		manifest: `/manifest.json`,
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
					url: image ?? logo,
					width: 1200,
					height: 630,
					alt: 'Oryntal Preview Image'
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image ?? logo],
			creator: '@Purrquinox'
		},
		icons: {
			icon: [
				{ url: '/logo.png', type: 'image/png', sizes: '220x220' },
				{ url: '/logo_512x512.png', type: 'image/png', sizes: '512x512' }
			],
			apple: { url: '/logo_512x512.png' }
		},
		other: {
			sitemap: '/sitemap.xml',
			image: image ?? logo,
			'apple-mobile-web-app-status-bar': '#BCA7E8'
		}
	};
};

export default generateMetadata;
