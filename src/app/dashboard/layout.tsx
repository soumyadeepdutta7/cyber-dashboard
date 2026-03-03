import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar - fixed on the left */}
            <Sidebar />

            {/* Main content - pushed to the right on desktop, padded at bottom on mobile */}
            <main className="flex-1 md:pl-[260px] pb-16 md:pb-0 flex flex-col min-h-screen">
                {children}
            </main>
        </div>
    );
}
