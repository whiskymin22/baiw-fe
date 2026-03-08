import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactForm() {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("Contact form submitted:", formData);
        toast("Message Sent!", {
            description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        await new Promise((resolve) => window.setTimeout(resolve, 400));
        setIsSubmitting(false);
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label
                        htmlFor="name"
                        className="uppercase font-bold text-sm"
                    >
                        Name
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Your name…"
                        className="border-3"
                        data-testid="input-name"
                        autoComplete="name"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="email"
                        className="uppercase font-bold text-sm"
                    >
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="name@example.com"
                        className="border-3"
                        data-testid="input-email"
                        autoComplete="email"
                        inputMode="email"
                        spellCheck={false}
                        required
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="subject"
                    className="uppercase font-bold text-sm"
                >
                    Subject
                </Label>
                <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="What's this about…"
                    className="border-3"
                    data-testid="input-subject"
                    autoComplete="off"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="message"
                    className="uppercase font-bold text-sm"
                >
                    Message
                </Label>
                <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us what you need…"
                    className="border-3 min-h-32"
                    data-testid="textarea-message"
                    autoComplete="off"
                    required
                />
            </div>

            <Button
                type="submit"
                size="lg"
                className="w-full font-bold uppercase"
                data-testid="button-submit-contact"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
            >
                {isSubmitting ? "SENDING…" : "SEND MESSAGE"}
            </Button>
        </form>
    );
}
