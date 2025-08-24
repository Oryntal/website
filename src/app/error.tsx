'use client';
import ErrorComp from '@/components/etc/error';
import generateMetadata from '@/components/etc/seo';

export const metadata = generateMetadata({
	title: 'Error - Oryntal AI'
});

const Error = ({ reset }: { reset: () => void }) => {
	return (
		<ErrorComp
			status={500}
			message="Something went wrong"
			subtext="We're experiencing some technical difficulties. Please try again later."
			button={{
				label: 'Try Again',
				onClick: reset
			}}
		/>
	);
};

export default Error;
