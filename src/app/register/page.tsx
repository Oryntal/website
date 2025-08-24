import RegisterForm from '@/components/auth/register';
import generateMetadata from '@/components/etc/seo';

const Register = () => {
	return <RegisterForm />;
};

export const metadata = generateMetadata({
	title: 'Create Account - Oryntal AI',
	description:
		'Join Oryntal AI today and create your free account. Discover an inclusive AI platform designed for autistic people to explore interests, build connections, and belong.'
});
export default Register;
