import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="border-t-3 border-foreground bg-muted mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="md:col-span-2">
                        <h3
                            className="text-2xl font-bold mb-4"
                            data-testid="text-footer-brand"
                        >
                            DATA SCIENCE ACADEMY
                        </h3>
                        <p className="text-muted-foreground mb-4">
                            Master full-stack data science with hands-on courses
                            in Machine Learning, Deep Learning, MLOps, and
                            DataOps.
                        </p>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="border-3"
                                onClick={() => console.log("Github clicked")}
                                data-testid="button-social-github"
                                aria-label="Visit our GitHub"
                            >
                                <Github aria-hidden="true" className="w-5 h-5" />
                            </Button>
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="border-3"
                                onClick={() => console.log("Twitter clicked")}
                                data-testid="button-social-twitter"
                                aria-label="Visit our Twitter"
                            >
                                <Twitter aria-hidden="true" className="w-5 h-5" />
                            </Button>
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="border-3"
                                onClick={() => console.log("LinkedIn clicked")}
                                data-testid="button-social-linkedin"
                                aria-label="Visit our LinkedIn"
                            >
                                <Linkedin aria-hidden="true" className="w-5 h-5" />
                            </Button>
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="border-3"
                                onClick={() => console.log("Email clicked")}
                                data-testid="button-social-email"
                                aria-label="Email our team"
                            >
                                <Mail aria-hidden="true" className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h4
                            className="font-bold uppercase mb-4"
                            data-testid="text-footer-courses"
                        >
                            Courses
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/courses"
                                    data-testid="link-footer-courses"
                                >
                                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                                        All Courses
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/courses?skillLevel=beginner"
                                    data-testid="link-footer-beginner"
                                >
                                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                                        Beginner Courses
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/courses?skillLevel=intermediate"
                                    data-testid="link-footer-intermediate"
                                >
                                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                                        Intermediate Courses
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/courses?skillLevel=advanced"
                                    data-testid="link-footer-advanced"
                                >
                                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                                        Advanced Courses
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4
                            className="font-bold uppercase mb-4"
                            data-testid="text-footer-company"
                        >
                            Company
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" data-testid="link-footer-about">
                                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                                        About Us
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    data-testid="link-footer-careers"
                                >
                                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                                        Careers
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" data-testid="link-footer-blog">
                                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                                        Blog
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/" data-testid="link-footer-contact">
                                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                                        Contact
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t-3 border-foreground pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p
                            className="text-sm text-muted-foreground"
                            data-testid="text-footer-copyright"
                        >
                            © {new Date().getFullYear()} Data Science Academy.
                            All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link to="/" data-testid="link-footer-privacy">
                                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                                    Privacy Policy
                                </span>
                            </Link>
                            <Link to="/" data-testid="link-footer-terms">
                                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                                    Terms of Service
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
