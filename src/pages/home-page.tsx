import Header from '@/components/header';
import HeroSection from '@/components/sections/hero-section';
import FeaturesSection from '@/components/sections/features-section';
import FAQSection from '@/components/sections/faq-section';
import Footer from '@/components/footer';
import ProductFeatureSection from '@/components/sections/product-feature-section';
import ContactFormSection from '@/components/sections/contact-form-section';
import { ChatBot } from '@/components/chatbot';

export default function HomePage() {
	return (
		<div className='min-h-screen bg-white'>
			<Header />
			<main id='main-content'>
				<HeroSection />
				<FeaturesSection />
				<ProductFeatureSection />
				<FAQSection />
				<ContactFormSection />
			</main>
			<ChatBot />
			<Footer />
		</div>
	);
}
