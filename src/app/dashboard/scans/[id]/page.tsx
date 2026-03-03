"use client";

import { useRouter } from "next/navigation";
import { RefreshCcw, XOctagon, CheckCircle2, ChevronDown, ListFilter, ActivitySquare, Terminal, Search, Target, GitBranch, FlaskConical, FileCheck, ClipboardList, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockSteps, mockTerminalLogs, mockFindings } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

import { useState } from "react";

export default function ScanDetailPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'activity' | 'verification'>('activity');
    const [isStopModalOpen, setIsStopModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);

    return (
        <div className="flex flex-1 flex-col py-6 px-8 bg-background gap-6 max-w-[1500px] mx-auto w-full h-screen overflow-hidden">

            {/* Stop Scan Modal */}
            {isStopModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card w-full max-w-sm rounded-xl shadow-2xl border border-border p-6 relative text-center">
                        <button onClick={() => setIsStopModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                            <X className="size-5" />
                        </button>
                        <XOctagon className="size-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Stop Scan?</h2>
                        <p className="text-sm text-muted-foreground mb-6">Are you sure you want to stop this scan? This action cannot be undone.</p>
                        <div className="flex items-center gap-3 w-full">
                            <Button variant="outline" className="flex-1" onClick={() => setIsStopModalOpen(false)}>Cancel</Button>
                            <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white" onClick={() => setIsStopModalOpen(false)}>Stop Scan</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Report Modal */}
            {isExportModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card w-full max-w-sm rounded-xl shadow-2xl border border-border p-6 relative">
                        <button onClick={() => setIsExportModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                            <X className="size-5" />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Export Report</h2>
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Format</label>
                                <select className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option>PDF Document (.pdf)</option>
                                    <option>CSV Data (.csv)</option>
                                    <option>JSON Data (.json)</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 w-full">
                            <Button variant="outline" className="flex-1" onClick={() => setIsExportModalOpen(false)}>Cancel</Button>
                            <Button className="flex-1 bg-primary hover:bg-primary/90 text-white" onClick={() => setIsExportModalOpen(false)}>Export</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Breadcrumb & Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                    <span className="text-foreground cursor-pointer hover:underline" onClick={() => router.push('/dashboard')}>Scan</span>
                    <span>/</span>
                    <span className="cursor-pointer hover:text-foreground">Private Assets</span>
                    <span>/</span>
                    <span className="text-primary">New Scan</span>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={() => setIsExportModalOpen(true)} variant="outline" className="border-border rounded-lg bg-background font-medium hover:bg-muted">
                        Export Report
                    </Button>
                    <Button onClick={() => setIsStopModalOpen(true)} variant="outline" className="border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-500 font-medium rounded-lg">
                        Stop Scan
                    </Button>
                </div>
            </div>

            {/* Progress Card */}
            <div className="flex rounded-xl border border-border bg-card p-6 shadow-sm w-full">
                {/* Left Side: Circular Progress */}
                <div className="flex items-center pr-8 border-r border-border shrink-0">
                    <div className="relative flex size-28 items-center justify-center rounded-full border-8 border-muted dark:border-[#1F1F1F]">
                        <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold tracking-tighter text-primary">0%</span>
                            <span className="text-[10px] text-muted-foreground uppercase font-semibold mt-0.5">In Progress</span>
                        </div>
                        <svg className="absolute inset-0 size-full -rotate-90">
                            <circle cx="50px" cy="50px" r="46px" className="stroke-primary fill-none" strokeWidth="8" strokeDasharray="290" strokeDashoffset="290" />
                        </svg>
                    </div>
                </div>

                {/* Right Side: Stepper and Metadata */}
                <div className="flex flex-1 flex-col pl-8">
                    {/* Top half: Stepper */}
                    <div className="flex items-center justify-between relative pb-6 border-b border-border w-full">
                        {/* Connecting line */}
                        <div className="absolute left-[5%] right-[5%] top-5 h-px bg-border z-0" />

                        {mockSteps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center gap-3 relative z-10 w-24">
                                <div className={cn(
                                    "flex size-10 items-center justify-center rounded-full border-[1.5px] bg-card transition-colors",
                                    step.active
                                        ? "border-primary bg-primary text-primary-foreground shadow-[0_0_15px_rgba(12,200,168,0.3)] ring-4 ring-primary/20"
                                        : "border-border text-muted-foreground"
                                )}>
                                    {step.id === 'spidering' && <Target className="size-4" />}
                                    {step.id === 'mapping' && <GitBranch className="size-4" />}
                                    {step.id === 'testing' && <FlaskConical className="size-4" />}
                                    {step.id === 'validating' && <FileCheck className="size-4" />}
                                    {step.id === 'reporting' && <ClipboardList className="size-4" />}
                                </div>
                                <span className={cn(
                                    "text-sm font-medium whitespace-nowrap",
                                    step.active ? "text-foreground" : "text-muted-foreground"
                                )}>{step.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Bottom half: Metadata Row */}
                    <div className="flex items-center justify-between w-full pt-6">
                        <div className="flex flex-col gap-1 items-start text-left">
                            <span className="text-xs font-semibold text-muted-foreground">Scan Type</span>
                            <span className="text-sm font-semibold text-foreground">Grey Box</span>
                        </div>
                        <div className="flex flex-col gap-1 items-start text-left">
                            <span className="text-xs font-semibold text-muted-foreground">Targets</span>
                            <span className="text-sm font-semibold text-foreground">google.com</span>
                        </div>
                        <div className="flex flex-col gap-1 items-start text-left">
                            <span className="text-xs font-semibold text-muted-foreground">Started At</span>
                            <span className="text-sm font-semibold text-foreground">Nov 22, 09:00AM</span>
                        </div>
                        <div className="flex flex-col gap-1 items-start text-left">
                            <span className="text-xs font-semibold text-muted-foreground">Credentials</span>
                            <span className="text-sm font-semibold text-foreground">2 Active</span>
                        </div>
                        <div className="flex flex-col gap-1 items-start text-left">
                            <span className="text-xs font-semibold text-muted-foreground">Files</span>
                            <span className="text-sm font-semibold text-foreground">Control.pdf</span>
                        </div>
                        <div className="flex flex-col gap-1 items-start text-left">
                            <span className="text-xs font-semibold text-muted-foreground">Checklists</span>
                            <span className="text-sm font-semibold text-primary">40/350</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Split Layout */}
            <div className="flex flex-1 gap-6 min-h-0">

                {/* Left Panel - Live Console */}
                <div className="flex w-[60%] flex-col rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    {/* Console Header */}
                    <div className="flex items-center justify-between border-b border-border p-3 px-4 bg-muted/30">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="size-2 rounded-full bg-primary" />
                                <span className="text-sm font-semibold">Live Scan Console</span>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground mt-1">
                                <RefreshCcw className="size-3 animate-spin" /> Running...
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <ChevronDown className="size-4" />
                            <XOctagon className="size-4" />
                        </div>
                    </div>

                    {/* Console Tabs */}
                    <div className="flex items-center gap-6 border-b border-border px-4 mt-2">
                        <button
                            onClick={() => setActiveTab('activity')}
                            className={cn(
                                "border-b-2 pb-2 text-sm font-medium flex items-center gap-2 transition-colors",
                                activeTab === 'activity' ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                            )}>
                            <Terminal className="size-4" /> Activity Log
                        </button>
                        <button
                            onClick={() => setActiveTab('verification')}
                            className={cn(
                                "border-b-2 pb-2 text-sm font-medium flex items-center gap-2 transition-colors",
                                activeTab === 'verification' ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                            )}>
                            <ActivitySquare className="size-4" /> Verification Loops
                        </button>
                    </div>

                    {/* Console Output */}
                    <div className="flex-1 overflow-auto bg-[#FAFAFA] dark:bg-[#121212] p-4 font-mono text-sm">
                        {activeTab === 'activity' ? (
                            <div className="space-y-4">
                                {mockTerminalLogs.map((log, i) => (
                                    <div key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        <span className="text-gray-400 dark:text-gray-500 select-none">[{log.time}]</span>{" "}
                                        {log.text.split('\n').map((line, j) => {
                                            // Build regex parts carefully to avoid syntax errors
                                            const parts = [
                                                log.highlight,
                                                log.highlightUrl,
                                                log.highlightKeyword,
                                                log.codeHighlight,
                                                log.boldHighlight
                                            ].filter(Boolean)
                                                .map(p => p?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape RegExp special characters

                                            const regex = parts.length > 0 ? new RegExp(`(${parts.join('|')})`, 'gi') : null;

                                            const lineParts = regex ? line.split(regex) : [line];

                                            return (
                                                <span key={j} className="block w-full">
                                                    {lineParts.map((part, k) => {
                                                        if (log.highlight && part === log.highlight) return <span key={k} className="text-primary">{part}</span>;
                                                        if (log.highlightUrl && part === log.highlightUrl) return <span key={k} className="bg-muted px-1 rounded text-primary">{part}</span>;
                                                        if (log.codeNode && part.includes(log.codeNode)) return <span key={k} className="text-blue-500 dark:text-blue-400">{part}</span>;
                                                        if (log.highlightKeyword && part === log.highlightKeyword) return <span key={k} className="text-purple-500">{part}</span>;
                                                        if (log.codeHighlight && part === log.codeHighlight) return <span key={k} className="text-green-600 dark:text-green-500">{part}</span>;
                                                        if (log.boldHighlight && part === log.boldHighlight) return <span key={k} className="font-bold text-red-500">{part}</span>;
                                                        return part;
                                                    })}
                                                </span>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground flex-col gap-2">
                                <ActivitySquare className="size-8 opacity-50" />
                                <p>No active verification loops running at the moment.</p>
                            </div>
                        )}
                    </div>

                    {/* Console Footer Status */}
                    <div className="flex items-center justify-between border-t border-border p-3 px-4 text-xs text-muted-foreground bg-muted/20">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-1.5"><div className="size-1.5 rounded-full bg-gray-400" /> Sub-Agents: 0</div>
                            <div className="flex items-center gap-1.5"><div className="size-1.5 rounded-full bg-primary" /> Parallel Executions: 2</div>
                            <div className="flex items-center gap-1.5"><div className="size-1.5 rounded-full bg-blue-500" /> Operations: 1</div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Finding Log */}
                <div className="flex w-[40%] flex-col rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between border-b border-border p-4">
                        <span className="text-sm font-semibold">Finding Log</span>
                        <Badge variant="default" className="bg-muted text-foreground">3 New</Badge>
                    </div>

                    <div className="flex-1 overflow-auto p-4 space-y-4">
                        {mockFindings.map((finding) => (
                            <div key={finding.id} className="rounded-lg border border-border bg-background p-4 shadow-sm hover:border-border/80 hover:bg-muted/30 cursor-pointer transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                    <Badge variant={finding.variant as "default" | "critical" | "high" | "medium" | "low"} className="px-2">{finding.severity}</Badge>
                                    <span className="text-xs text-muted-foreground">{finding.time}</span>
                                </div>
                                <h4 className="text-sm font-semibold text-foreground mb-1">{finding.title}</h4>
                                <p className="text-xs font-mono text-primary bg-primary/10 rounded px-1.5 py-0.5 inline-block mb-2">{finding.path}</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {finding.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Finding Log Footer Stats */}
                    <div className="flex items-center justify-around border-t border-border p-3 px-4 text-sm bg-muted/20 pb-4">
                        <span className="text-red-500 font-semibold cursor-pointer hover:underline">Critical: 0</span>
                        <span className="text-orange-500 font-semibold cursor-pointer hover:underline">High: 0</span>
                        <span className="text-yellow-600 dark:text-yellow-500 font-semibold cursor-pointer hover:underline">Medium: 0</span>
                        <span className="text-blue-500 font-semibold cursor-pointer hover:underline">Low: 0</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
