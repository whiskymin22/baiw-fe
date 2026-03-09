import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
	{
		question: 'How does the AI styling feature work?',
		answer: 'Our AI analyzes your browsing history, purchases, and preferences to recommend products tailored to your style. The more you interact, the better it gets at understanding your taste.',
	},
	{
		question: 'What is your return policy?',
		answer: 'We offer a 30-day hassle-free return policy. If you\'re not happy with your purchase, simply initiate a return and we\'ll provide a prepaid shipping label.',
	},
	{
		question: 'How long does shipping take?',
		answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available at checkout. Orders over $50 qualify for free standard shipping.',
	},
	{
		question: 'Can I track my order?',
		answer: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also check your order status in your account dashboard.',
	},
	{
		question: 'Do you offer international shipping?',
		answer: 'Currently we ship within the US. We\'re working on expanding to international markets and will announce when that becomes available.',
	},
	{
		question: 'How do I find my size?',
		answer: 'Each product page includes a detailed size guide. If you\'re between sizes, our AI chatbot can help recommend the best fit based on your measurements.',
	},
];

export default function FAQSection() {
	return (
		<section className='py-20 px-4 bg-white' data-testid='section-faq'>
			<div className='max-w-3xl mx-auto'>
				<div className='text-center mb-14'>
					<p className='text-sm font-medium text-gray-500 uppercase tracking-wider mb-3'>
						Support
					</p>
					<h2
						className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900'
						data-testid='text-faq-title'
					>
						Frequently Asked Questions
					</h2>
				</div>

				<Accordion
					type='single'
					collapsible
					className='space-y-3'
					data-testid='accordion-faq'
				>
					{faqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className='border border-gray-200 rounded-xl px-6 bg-white data-[state=open]:shadow-sm transition-shadow'
							data-testid={`faq-item-${index}`}
						>
							<AccordionTrigger
								className='py-5 text-left text-sm font-medium hover:no-underline text-gray-900'
								data-testid={`faq-question-${index}`}
							>
								{faq.question}
							</AccordionTrigger>
							<AccordionContent
								className='pb-5 text-sm text-gray-500 leading-relaxed'
								data-testid={`faq-answer-${index}`}
							>
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
