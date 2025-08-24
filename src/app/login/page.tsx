import LoginForm from '@/components/auth/login';
import generateMetadata from '@/components/etc/seo';

const Login = () => {
	return <LoginForm />;
};

export const metadata = generateMetadata({
	title: 'Login - Oryntal AI',
	description:
		'Login to Oryntal AI by Purrquinox! A safe, supportive AI-powered space where autistic individuals can share passions, connect, and be their trueselves.'
});
export default Login;
