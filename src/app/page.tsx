import Hero from '@/components/home/hero';
import InteractiveFeatures from '@/components/home/interactive-features';
import ExpressionCanvas from '@/components/home/expression-canvas';
import AICompanionDemo from '@/components/home/ai-companion-demo';
import AccessibilityFirst from '@/components/home/accessibility-first';
import JoinMovement from '@/components/home/join-movement';
import ThemeToggle from '@/components/themes/theme-toggle';

const Home = () => {
	return (
		<main className="bg-background text-foreground min-h-screen">
			<ThemeToggle />
			<Hero />
			<ExpressionCanvas />
			<AICompanionDemo />
			<InteractiveFeatures />
			<AccessibilityFirst />
			<JoinMovement />
		</main>
	);
};

export default Home;
