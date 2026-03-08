import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What prerequisites do I need for these courses?",
        answer: "Basic programming knowledge in Python is recommended. For advanced courses like Deep Learning, familiarity with machine learning concepts is helpful but not required.",
    },
    {
        question: "How long do I have access to the course materials?",
        answer: "All courses include lifetime access to materials, including future updates and additions to the curriculum.",
    },
    {
        question: "Do you offer job placement assistance?",
        answer: "Yes! We provide resume reviews, mock interviews, and connections to our network of hiring partners actively seeking data science talent.",
    },
    {
        question: "Are there any live sessions or is it self-paced?",
        answer: "Courses are primarily self-paced with weekly live Q&A sessions with instructors. Recordings of all live sessions are available.",
    },
    {
        question: "What kind of certificate will I receive?",
        answer: "Upon completion, you'll receive a verified certificate that you can share on LinkedIn and include in your portfolio.",
    },
    {
        question: "Can I get a refund if I'm not satisfied?",
        answer: "We offer a 30-day money-back guarantee. If you're not satisfied within the first month, you can request a full refund.",
    },
];

export default function FAQSection() {
    return (
        <section className="py-16 px-4" data-testid="section-faq">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div
                        className="inline-block bg-accent border-3 border-foreground px-8 py-4"
                        style={{ boxShadow: "var(--shadow-lg)" }}
                    >
                        <h2
                            className="text-3xl md:text-4xl font-bold tracking-tight text-accent-foreground"
                            data-testid="text-faq-title"
                        >
                            FREQUENTLY ASKED
                        </h2>
                    </div>
                </div>

                <Accordion
                    type="single"
                    collapsible
                    className="space-y-4"
                    data-testid="accordion-faq"
                >
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border-3 border-foreground bg-card"
                            style={{ boxShadow: "var(--shadow)" }}
                            data-testid={`faq-item-${index}`}
                        >
                            <AccordionTrigger
                                className="px-6 py-4 text-left font-bold hover:no-underline"
                                data-testid={`faq-question-${index}`}
                            >
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent
                                className="px-6 pb-4 text-muted-foreground"
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
