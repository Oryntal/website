'use client';

import type React from 'react';
import { useState } from 'react';
import ThemeToggle from '@/components/themes/theme-toggle';
import Link from 'next/link';

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert("Passwords don't match!");
			return;
		}
		if (!acceptTerms) {
			alert('Please accept the terms and conditions');
			return;
		}

		setIsLoading(true);
		// Simulate registration process
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsLoading(false);
		console.log('Registration attempted with:', formData);
	};

	return (
		<div className="from-background via-primary/5 to-accent/10 relative flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
			{/* Theme Toggle */}
			<div className="absolute top-6 right-6">
				<ThemeToggle />
			</div>

			{/* Floating Background Elements */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="bg-primary/10 absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full blur-3xl"></div>
				<div className="bg-accent/10 absolute right-1/4 bottom-1/4 h-48 w-48 animate-pulse rounded-full blur-2xl delay-1000"></div>
				<div className="bg-secondary/10 absolute top-3/4 left-1/3 h-32 w-32 animate-pulse rounded-full blur-xl delay-500"></div>
			</div>

			{/* Register Card */}
			<div className="relative w-full max-w-md">
				<div className="bg-card/80 border-border/50 space-y-6 rounded-2xl border p-8 shadow-2xl backdrop-blur-xl">
					{/* Header */}
					<div className="space-y-2 text-center">
						<div className="from-accent to-secondary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br">
							<svg
								className="text-accent-foreground h-8 w-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
								/>
							</svg>
						</div>
						<h1 className="text-card-foreground text-3xl font-black">Create Account</h1>
						<p className="text-muted-foreground">Join us today and get started</p>
					</div>

					{/* Registration Form */}
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Name Fields */}
						<div className="grid grid-cols-2 gap-3">
							<div className="space-y-2">
								<label
									htmlFor="firstName"
									className="text-card-foreground block text-sm font-semibold"
								>
									First Name
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									value={formData.firstName}
									onChange={handleInputChange}
									className="bg-input border-border focus:ring-ring text-card-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
									placeholder="John"
									required
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="lastName"
									className="text-card-foreground block text-sm font-semibold"
								>
									Last Name
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									value={formData.lastName}
									onChange={handleInputChange}
									className="bg-input border-border focus:ring-ring text-card-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
									placeholder="Doe"
									required
								/>
							</div>
						</div>

						{/* Email Field */}
						<div className="space-y-2">
							<label htmlFor="email" className="text-card-foreground block text-sm font-semibold">
								Email Address
							</label>
							<div className="relative">
								<input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
									className="bg-input border-border focus:ring-ring text-card-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
									placeholder="john@example.com"
									required
								/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-3">
									<svg
										className="text-muted-foreground h-5 w-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
										/>
									</svg>
								</div>
							</div>
						</div>

						{/* Password Field */}
						<div className="space-y-2">
							<label
								htmlFor="password"
								className="text-card-foreground block text-sm font-semibold"
							>
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									value={formData.password}
									onChange={handleInputChange}
									className="bg-input border-border focus:ring-ring text-card-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-3 pr-12 transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
									placeholder="Create a strong password"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="text-muted-foreground hover:text-card-foreground absolute inset-y-0 right-0 flex items-center pr-3 transition-colors"
								>
									{showPassword ? (
										<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
											/>
										</svg>
									) : (
										<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>

						{/* Confirm Password Field */}
						<div className="space-y-2">
							<label
								htmlFor="confirmPassword"
								className="text-card-foreground block text-sm font-semibold"
							>
								Confirm Password
							</label>
							<div className="relative">
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									value={formData.confirmPassword}
									onChange={handleInputChange}
									className="bg-input border-border focus:ring-ring text-card-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-3 pr-12 transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none"
									placeholder="Confirm your password"
									required
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="text-muted-foreground hover:text-card-foreground absolute inset-y-0 right-0 flex items-center pr-3 transition-colors"
								>
									{showConfirmPassword ? (
										<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
											/>
										</svg>
									) : (
										<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>

						{/* Terms and Conditions */}
						<div className="flex items-start space-x-3">
							<input
								id="terms"
								type="checkbox"
								checked={acceptTerms}
								onChange={(e) => setAcceptTerms(e.target.checked)}
								className="text-primary bg-input border-border focus:ring-ring mt-1 h-4 w-4 rounded focus:ring-2"
							/>
							<label htmlFor="terms" className="text-muted-foreground text-sm leading-relaxed">
								I agree to the{' '}
								<Link
									href="https://purrquinox.com/terms"
									className="text-primary hover:text-primary/80 font-medium transition-colors"
								>
									Terms of Service
								</Link>{' '}
								and{' '}
								<Link
									href="https://purrquinox.com/privacy"
									type="button"
									className="text-primary hover:text-primary/80 font-medium transition-colors"
								>
									Privacy Policy
								</Link>
							</label>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading || !acceptTerms}
							className="from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-accent-foreground w-full transform rounded-xl bg-gradient-to-r px-4 py-3 font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isLoading ? (
								<div className="flex items-center justify-center space-x-2">
									<div className="border-accent-foreground/30 border-t-accent-foreground h-5 w-5 animate-spin rounded-full border-2"></div>
									<span>Creating account...</span>
								</div>
							) : (
								'Create Account'
							)}
						</button>

						{/* Divider */}
						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<div className="border-border w-full border-t"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-card text-muted-foreground px-4">Or sign up with</span>
							</div>
						</div>

						{/* Social Registration Buttons */}
						<div className="grid grid-cols-2 gap-3">
							<button
								type="button"
								className="border-border hover:bg-muted/50 flex items-center justify-center rounded-xl border px-4 py-3 transition-colors"
							>
								<svg className="text-card-foreground h-5 w-5" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="currentColor"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="currentColor"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										fill="currentColor"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
								<span className="text-card-foreground ml-2 text-sm font-medium">Google</span>
							</button>
							<button
								type="button"
								className="border-border hover:bg-muted/50 flex items-center justify-center rounded-xl border px-4 py-3 transition-colors"
							>
								<svg
									className="text-card-foreground h-5 w-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
								<span className="text-card-foreground ml-2 text-sm font-medium">Facebook</span>
							</button>
						</div>
					</form>

					{/* Sign In Link */}
					<div className="border-border border-t pt-4 text-center">
						<p className="text-muted-foreground text-sm">
							Already have an account?{' '}
							<Link
								href="/login"
								className="text-primary hover:text-primary/80 font-semibold transition-colors"
							>
								Sign in here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterForm;
