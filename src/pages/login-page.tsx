import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useAuth } from "@/context/auth-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/header";
import Footer from "@/components/footer";
import type { ApiErrorResponse } from "@/types/api";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(50, "Password must be at most 50 characters."),
});

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await login(data);
            navigate("/");
            toast.success("Login successful!");
        } catch (error) {
            const apiError = error as ApiErrorResponse;
            toast.error(
                apiError.response?.data?.message || "Login failed. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main
                className="relative flex-1 flex items-center justify-center p-4 overflow-hidden min-h-[70vh]"
                id="main-content"
            >
                <div
                    className="absolute top-20 left-10 w-40 h-40 bg-chart-2 border-3 border-foreground rotate-12 hidden lg:block"
                    style={{ boxShadow: "var(--shadow-xl)" }}
                />
                <div
                    className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-chart-4 border-3 border-foreground hidden lg:block"
                    style={{ boxShadow: "var(--shadow-lg)" }}
                />

                <div className="relative z-10 w-full max-w-md">
                    <div
                        className="bg-card border-3 border-foreground p-8"
                        style={{ boxShadow: "var(--shadow-2xl)" }}
                    >
                        <div className="mb-8">
                            <h1
                                className="text-3xl font-bold tracking-tight mb-2"
                                data-testid="text-login-title"
                            >
                                LOG IN
                            </h1>
                            <p className="text-muted-foreground">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="uppercase font-bold text-sm"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            {...field}
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            className="border-3"
                                            data-testid="input-email"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="email"
                                            inputMode="email"
                                            spellCheck={false}
                                        />
                                        {fieldState.error && (
                                            <p
                                                className="text-sm text-destructive"
                                                role="alert"
                                                aria-live="polite"
                                            >
                                                {fieldState.error.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="password"
                                            className="uppercase font-bold text-sm"
                                        >
                                            Password
                                        </Label>
                                        <Input
                                            {...field}
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter password…"
                                            className="border-3"
                                            data-testid="input-password"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="current-password"
                                        />
                                        {fieldState.error && (
                                            <p
                                                className="text-sm text-destructive"
                                                role="alert"
                                                aria-live="polite"
                                            >
                                                {fieldState.error.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full font-bold uppercase"
                                data-testid="button-login"
                                disabled={isSubmitting}
                                aria-busy={isSubmitting}
                            >
                                {isSubmitting ? "Logging in…" : "Log In"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{" "}
                                <Link to="/signup" data-testid="link-signup">
                                    <span className="font-bold underline cursor-pointer hover-elevate">
                                        Sign Up
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
