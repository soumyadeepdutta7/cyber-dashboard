"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, Hexagon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, perform authentication here
        // Redirect to dashboard on success
        router.push("/dashboard");
    };

    return (
        <div className="flex h-screen w-full bg-[#13161D] text-white relative overflow-hidden">
            {/* Global Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                {/* Left Teal Glow */}
                <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#0E373B]/30 blur-[150px] rounded-full mix-blend-screen" />

                {/* Right Bottom Warm Gradient */}
                <div className="absolute -bottom-[20%] right-[-10%] w-[1000px] h-[1000px] blur-[150px] rounded-full mix-blend-screen"
                    style={{ background: 'radial-gradient(circle, #D74838 0%, #B4332D 30%, #5E171B 60%, transparent 80%)' }} />

                {/* Mid Right Khaki Glow */}
                <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-[#7D6C52]/20 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            {/* Top Left Logo */}
            <div className="absolute top-6 left-6 lg:top-8 lg:left-10 z-30 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center bg-[#0CC8A8] rounded-full">
                    <div className="size-2.5 bg-white rounded-full ml-0.5"></div>
                </div>
                <span className="text-xl font-bold tracking-tight text-white mb-0.5">aps</span>
            </div>

            {/* Bottom Left - Trustpilot */}
            <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-10 z-30 hidden lg:block">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 text-[#0CC8A8] font-bold text-lg">
                        <span className="text-2xl mt-[-2px]">★</span> Trustpilot
                    </div>
                    <p className="text-[13px] text-gray-400 tracking-wide font-medium">
                        Rated <span className="text-white">4.5/5.0</span> <span className="text-gray-500 font-normal">(100k+ reviews)</span>
                    </p>
                </div>
            </div>

            {/* Left Column - Promotional */}
            <div className="hidden lg:flex flex-col justify-center w-1/2 p-10 lg:pl-16 relative z-10 h-full animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="relative z-10 space-y-10 max-w-[600px] xl:-ml-4">
                    <h1 className="text-[40px] lg:text-[44px] font-semibold leading-[1.15] tracking-tight whitespace-nowrap">
                        Expert level Cybersecurity<br />
                        in <span className="text-[#0CC8A8] font-semibold">hours</span> not weeks.
                    </h1>

                    <div className="space-y-5">
                        <h3 className="text-lg font-medium text-gray-300">What&apos;s included</h3>
                        <ul className="space-y-4">
                            {[
                                "Effortlessly spider and map targets to uncover hidden security flaws",
                                "Deliver high-quality, validated findings in hours, not weeks.",
                                "Generate professional, enterprise-grade security reports automatically."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                                    <Check className="size-5 text-[#0CC8A8] shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-12 relative z-10 bg-black/40 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none animate-in fade-in slide-in-from-right-8 duration-700 lg:delay-150">
                <div className="w-full max-w-[480px] bg-white text-black p-8 sm:p-10 rounded-3xl shadow-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-semibold mb-2">Sign up</h2>
                        <p className="text-gray-600 text-sm">
                            Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <Input placeholder="First name*" required className="bg-white border-gray-200 rounded-xl h-11 text-black placeholder:text-gray-400 focus-visible:ring-primary" />
                            <Input placeholder="Last name*" required className="bg-white border-gray-200 rounded-xl h-11 text-black placeholder:text-gray-400 focus-visible:ring-primary" />
                            <Input type="email" placeholder="Email address*" required className="bg-white border-gray-200 rounded-xl h-11 text-black placeholder:text-gray-400 focus-visible:ring-primary" />
                        </div>

                        <div className="relative mt-4">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password (8+ characters)*"
                                required
                                minLength={8}
                                className="bg-white border-gray-200 rounded-xl h-11 pr-10 text-black placeholder:text-gray-400 focus-visible:ring-primary"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                            </button>
                        </div>

                        <div className="flex items-start gap-3 py-2">
                            <Checkbox id="terms" required className="mt-1 flex-shrink-0" />
                            <label htmlFor="terms" className="text-xs text-gray-600 leading-snug">
                                I agree to Aps&apos;s <Link href="#" className="font-medium hover:text-primary">Terms &amp; Conditions</Link> and acknowledge the <Link href="#" className="font-medium hover:text-primary text-primary">Privacy Policy</Link>
                            </label>
                        </div>

                        <Button type="submit" size="lg" className="w-full rounded-full text-base font-medium h-12 bg-primary hover:bg-primary/90 text-white">
                            Create account
                        </Button>

                        <div className="flex justify-center gap-3 pt-4">
                            <Button type="button" className="flex-1 rounded-full h-14 bg-black text-white hover:bg-black/90 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" className="size-6 fill-current"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.86 3.46-.8 1.43.08 2.59.55 3.35 1.48-2.61 1.6-2.14 4.54.34 5.56-.63 1.63-1.44 3.07-2.23 6.03zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                            </Button>
                            <Button type="button" className="flex-1 rounded-full h-14 bg-[#f9f9f9] text-black hover:bg-gray-100 flex items-center justify-center border border-gray-100/50">
                                <svg viewBox="0 0 24 24" className="size-6"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                            </Button>
                            <Button type="button" className="flex-1 rounded-full h-14 bg-[#1877F2] hover:bg-[#1877F2]/90 flex items-center justify-center text-white">
                                <svg viewBox="0 0 24 24" className="size-6 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
