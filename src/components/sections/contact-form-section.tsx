import ContactForm from "../contact-form";

export default function ContactFormSection() {
    return (
        <section
            className="py-16 px-4 bg-background"
            data-testid="section-contact"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div
                        className="inline-block bg-chart-3 border-3 border-foreground px-8 py-4"
                        style={{ boxShadow: "var(--shadow-lg)" }}
                    >
                        <h2
                            className="text-3xl md:text-4xl font-bold tracking-tight text-background"
                            data-testid="text-contact-title"
                        >
                            GET IN TOUCH
                        </h2>
                    </div>
                    <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Send us a
                        message and we'll respond as soon as possible.
                    </p>
                </div>

                <div
                    className="bg-card border-3 border-foreground p-8"
                    style={{ boxShadow: "var(--shadow-xl)" }}
                >
                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
