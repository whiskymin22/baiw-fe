import ContactForm from '../contact-form';

export default function ContactFormSection() {
	return (
		<section
			className='py-20 px-4 bg-gray-50'
			data-testid='section-contact'
		>
			<div className='max-w-3xl mx-auto'>
				<div className='text-center mb-14'>
					<p className='text-sm font-medium text-gray-500 uppercase tracking-wider mb-3'>
						Contact
					</p>
					<h2
						className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900'
						data-testid='text-contact-title'
					>
						Get in Touch
					</h2>
					<p className='text-gray-500 mt-4 max-w-xl mx-auto'>
						Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
					</p>
				</div>

				<div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-8'>
					<ContactForm />
				</div>
			</div>
		</section>
	);
}
