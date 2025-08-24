import ErrorComp from '@/components/etc/error';
import generateMetadata from '@/components/etc/seo';

export const metadata = generateMetadata({
	title: 'Page not Found - Oryntal AI.'
});

const ErrorPage = () => {
	return (
		<>
			<ErrorComp
				status={404}
				message="Page Not Found"
				subtext="The page you're looking for doesn't exist."
			/>
		</>
	);
};

export default ErrorPage;
