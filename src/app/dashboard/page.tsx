"use client";

import { Search, Filter, Columns, Plus, MoreHorizontal, ChevronLeft, ChevronRight, Activity, AlertTriangle, Ban, SearchCheck, X, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusChip } from "@/components/ui/status-chip";
import { mockScans, mockDashboardStats } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isNewScanOpen, setIsNewScanOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isColumnOpen, setIsColumnOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        type: true,
        status: true,
        progress: true,
        vulnerability: true,
        lastScan: true
    });

    useEffect(() => {
        // Simulate network loading state
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleRowClick = (id: string) => {
        router.push(`/dashboard/scans/scan-1`); // Always route to scan-1 for mock
    };

    // Extended mock data for pagination testing
    const extendedScans = Array(5).fill(mockScans).flat().map((scan, index) => ({
        ...scan,
        id: `scan-${index}`
    }));

    const filteredScans = extendedScans.filter(scan => {
        const matchesSearch = scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            scan.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = !filterStatus || scan.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const itemsPerPage = 8;
    const totalPages = Math.ceil(filteredScans.length / itemsPerPage);
    const paginatedScans = filteredScans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (isLoading) {
        return (
            <div className="flex flex-1 flex-col p-8 bg-background gap-6 max-w-[1400px] mx-auto w-full items-center justify-center">
                <Loader2 className="size-10 animate-spin text-primary opacity-50 mb-4" />
                <p className="text-muted-foreground font-medium animate-pulse">Loading dashboard data...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col p-8 bg-background gap-6 max-w-[1400px] mx-auto w-full relative animate-in fade-in duration-500">

            {/* New Scan Modal */}
            {isNewScanOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card w-full max-w-lg rounded-xl shadow-2xl border border-border p-6 relative">
                        <button onClick={() => setIsNewScanOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                            <X className="size-5" />
                        </button>
                        <h2 className="text-xl font-semibold mb-6">New Scan</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Target URL</label>
                                <Input placeholder="https://example.com" />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1.5 block">Scan Type</label>
                                <select className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option>Grey Box</option>
                                    <option>Black Box</option>
                                    <option>White Box</option>
                                </select>
                            </div>
                            <Button
                                className="w-full mt-4 bg-primary hover:bg-primary/90 text-white"
                                onClick={() => {
                                    setIsNewScanOpen(false);
                                    router.push('/dashboard/scans/new');
                                }}>
                                Start Scanning
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Banner Stats */}
            <div className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex w-full items-center justify-between text-sm text-muted-foreground border-b border-border pb-4 mb-4">
                    <span>Org: <span className="text-foreground font-medium">{mockDashboardStats.org}</span></span>
                    <span>Owner: <span className="text-foreground font-medium">{mockDashboardStats.owner}</span></span>
                    <span>Total Scans: <span className="text-foreground font-medium">100</span></span>
                    <span>Scheduled: <span className="text-foreground font-medium">1000</span></span>
                    <span>Rescans: <span className="text-foreground font-medium">100</span></span>
                    <span>Failed Scans: <span className="text-foreground font-medium">100</span></span>

                    <div className="flex items-center gap-1.5 text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full shrink-0 ml-4">
                        <Activity className="size-3.5" />
                        <span>10 mins ago</span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {/* Critical */}
                    <div className="flex flex-col gap-1 p-2">
                        <div className="flex items-start justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Critical Severity</span>
                            <div className="rounded-md bg-red-500/10 p-1.5 text-red-500 dark:bg-red-500/20 dark:text-red-400">
                                <Ban className="size-5" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-3xl font-bold">{mockDashboardStats.critical.count}</span>
                            <span className="text-xs font-medium text-red-500">
                                ↑ {mockDashboardStats.critical.change} increase than yesterday
                            </span>
                        </div>
                    </div>

                    {/* High */}
                    <div className="flex flex-col gap-1 p-2 border-l border-border px-6">
                        <div className="flex items-start justify-between">
                            <span className="text-sm font-medium text-muted-foreground">High Severity</span>
                            <div className="rounded-md bg-orange-500/10 p-1.5 text-orange-500 dark:bg-orange-500/20 dark:text-orange-400">
                                <AlertTriangle className="size-4" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-3xl font-bold">{mockDashboardStats.high.count}</span>
                            <span className="text-xs font-medium text-red-500">
                                ↑ {mockDashboardStats.high.change} increase than yesterday
                            </span>
                        </div>
                    </div>

                    {/* Medium */}
                    <div className="flex flex-col gap-1 p-2 border-l border-border px-6">
                        <div className="flex items-start justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Medium Severity</span>
                            <div className="rounded-md bg-yellow-500/10 p-1.5 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-500">
                                <AlertTriangle className="size-4 cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-3xl font-bold">{mockDashboardStats.medium.count}</span>
                            <span className="text-xs font-medium text-green-500">
                                ↓ {mockDashboardStats.medium.change} decrease than yesterday
                            </span>
                        </div>
                    </div>

                    {/* Low */}
                    <div className="flex flex-col gap-1 p-2 border-l border-border px-6">
                        <div className="flex items-start justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Low Severity</span>
                            <div className="rounded-md bg-blue-500/10 p-1.5 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400">
                                <SearchCheck className="size-4" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-3xl font-bold">{mockDashboardStats.low.count}</span>
                            <span className="text-xs font-medium text-red-500">
                                ↑ {mockDashboardStats.low.change} increase than yesterday
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Table Area */}
            <div className="flex flex-col rounded-xl border border-border bg-card shadow-sm flex-1 overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center gap-3 flex-1 max-w-6xl">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search scans by name or type..."
                                className="pl-9 bg-background/50 border-border h-10 w-full"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                        <div className="relative">
                            <Button variant="outline" size="sm" className="h-10 px-4 gap-2 font-medium" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                                <Filter className="size-4" /> Filter
                            </Button>
                            {isFilterOpen && (
                                <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-lg z-50 p-2">
                                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Filter by Status</div>
                                    <div className={cn("px-2 py-1.5 text-sm font-medium hover:bg-muted cursor-pointer rounded-md", !filterStatus && "bg-muted")} onClick={() => { setFilterStatus(null); setIsFilterOpen(false); setCurrentPage(1); }}>All Statuses</div>
                                    <div className={cn("px-2 py-1.5 text-sm font-medium hover:bg-muted cursor-pointer rounded-md", filterStatus === 'In Progress' && "bg-muted")} onClick={() => { setFilterStatus('In Progress'); setIsFilterOpen(false); setCurrentPage(1); }}>In Progress</div>
                                    <div className={cn("px-2 py-1.5 text-sm font-medium hover:bg-muted cursor-pointer rounded-md", filterStatus === 'Completed' && "bg-muted")} onClick={() => { setFilterStatus('Completed'); setIsFilterOpen(false); setCurrentPage(1); }}>Completed</div>
                                    <div className={cn("px-2 py-1.5 text-sm font-medium hover:bg-muted cursor-pointer rounded-md", filterStatus === 'Failed' && "bg-muted")} onClick={() => { setFilterStatus('Failed'); setIsFilterOpen(false); setCurrentPage(1); }}>Failed</div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <Button variant="outline" size="sm" className={cn("h-10 px-4 gap-2 font-medium", isColumnOpen && "bg-muted")} onClick={() => setIsColumnOpen(!isColumnOpen)}>
                                <Columns className="size-4" /> Column
                            </Button>
                            {isColumnOpen && (
                                <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-lg z-50 p-2 space-y-1">
                                    <label className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer"><input type="checkbox" checked={visibleColumns.name} onChange={() => setVisibleColumns(prev => ({ ...prev, name: !prev.name }))} className="rounded border-gray-300" /> Scan Name</label>
                                    <label className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer"><input type="checkbox" checked={visibleColumns.type} onChange={() => setVisibleColumns(prev => ({ ...prev, type: !prev.type }))} className="rounded border-gray-300" /> Type</label>
                                    <label className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer"><input type="checkbox" checked={visibleColumns.status} onChange={() => setVisibleColumns(prev => ({ ...prev, status: !prev.status }))} className="rounded border-gray-300" /> Status</label>
                                    <label className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer"><input type="checkbox" checked={visibleColumns.progress} onChange={() => setVisibleColumns(prev => ({ ...prev, progress: !prev.progress }))} className="rounded border-gray-300" /> Progress</label>
                                    <label className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer"><input type="checkbox" checked={visibleColumns.vulnerability} onChange={() => setVisibleColumns(prev => ({ ...prev, vulnerability: !prev.vulnerability }))} className="rounded border-gray-300" /> Vulnerability</label>
                                    <label className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer"><input type="checkbox" checked={visibleColumns.lastScan} onChange={() => setVisibleColumns(prev => ({ ...prev, lastScan: !prev.lastScan }))} className="rounded border-gray-300" /> Last Scan</label>
                                </div>
                            )}
                        </div>
                        <Button onClick={() => setIsNewScanOpen(true)} size="sm" className="h-10 px-4 gap-2 font-medium bg-primary text-primary-foreground hover:bg-primary/90">
                            <Plus className="size-4" /> New scan
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-auto flex-1">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground bg-muted/30 sticky top-0 z-10 hidden md:table-header-group">
                            <tr>
                                {visibleColumns.name && <th className="px-6 py-4 font-medium text-muted-foreground transition-all">Scan Name</th>}
                                {visibleColumns.type && <th className="px-6 py-4 font-medium text-muted-foreground transition-all">Type</th>}
                                {visibleColumns.status && <th className="px-6 py-4 font-medium text-muted-foreground transition-all">Status</th>}
                                {visibleColumns.progress && <th className="px-6 py-4 font-medium text-muted-foreground transition-all">Progress</th>}
                                {visibleColumns.vulnerability && <th className="px-6 py-4 font-medium text-muted-foreground text-right w-[200px] transition-all">Vulnerability</th>}
                                {visibleColumns.lastScan && <th className="px-6 py-4 font-medium text-muted-foreground text-right w-[140px] transition-all">Last Scan</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {paginatedScans.length > 0 ? paginatedScans.map((scan) => (
                                <tr
                                    key={scan.id}
                                    onClick={() => handleRowClick(scan.id)}
                                    className="hover:bg-muted/50 transition-colors cursor-pointer group flex flex-col md:table-row py-4 md:py-0 border-b md:border-b-0"
                                >
                                    {visibleColumns.name && (
                                        <td className="px-6 py-4 font-medium flex justify-between md:table-cell group-hover:text-primary transition-colors">
                                            <span className="md:hidden text-xs text-muted-foreground font-normal">Scan Name</span>
                                            {scan.name}
                                        </td>
                                    )}
                                    {visibleColumns.type && (
                                        <td className="px-6 py-4 text-muted-foreground flex justify-between md:table-cell">
                                            <span className="md:hidden text-xs font-normal">Type</span>
                                            {scan.type}
                                        </td>
                                    )}
                                    {visibleColumns.status && (
                                        <td className="px-6 py-4 flex justify-between md:table-cell items-center">
                                            <span className="md:hidden text-xs text-muted-foreground font-normal">Status</span>
                                            <StatusChip status={scan.status} />
                                        </td>
                                    )}
                                    {visibleColumns.progress && (
                                        <td className="px-6 py-4 flex flex-col md:table-cell justify-center gap-2">
                                            <div className="flex md:hidden justify-between w-full mb-1">
                                                <span className="text-xs text-muted-foreground font-normal">Progress</span>
                                                <span className="text-xs font-semibold">{scan.progress}%</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-1.5 w-24 bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className={cn("h-full rounded-full transition-all duration-1000", scan.status === 'Failed' ? 'bg-red-500' : 'bg-primary')}
                                                        style={{ width: `${scan.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold hidden md:inline-block">{scan.progress}%</span>
                                            </div>
                                        </td>
                                    )}
                                    {visibleColumns.vulnerability && (
                                        <td className="px-6 py-4 md:table-cell">
                                            <div className="flex md:justify-end items-center gap-1.5 flex-wrap justify-between w-full">
                                                <span className="md:hidden text-xs text-muted-foreground font-normal text-left shrink-0 block mb-2 w-full">Vulnerability</span>
                                                {scan.vulnerabilities.critical > 0 && <Badge variant="critical" className="h-[22px] min-w-[22px] text-xs shrink-0 justify-center leading-none tracking-tight rounded-[4px]">{scan.vulnerabilities.critical}</Badge>}
                                                {scan.vulnerabilities.high > 0 && <Badge variant="high" className="h-[22px] min-w-[22px] text-xs shrink-0 justify-center leading-none tracking-tight rounded-[4px]">{scan.vulnerabilities.high}</Badge>}
                                                {scan.vulnerabilities.medium > 0 && <Badge variant="medium" className="h-[22px] min-w-[22px] text-xs shrink-0 justify-center leading-none tracking-tight rounded-[4px]">{scan.vulnerabilities.medium}</Badge>}
                                                {scan.vulnerabilities.low > 0 && <Badge variant="low" className="h-[22px] min-w-[22px] text-xs shrink-0 justify-center leading-none tracking-tight rounded-[4px]">{scan.vulnerabilities.low}</Badge>}
                                            </div>
                                        </td>
                                    )}
                                    {visibleColumns.lastScan && (
                                        <td className="px-6 py-4 text-muted-foreground text-right flex justify-between md:table-cell whitespace-nowrap">
                                            <span className="md:hidden text-xs text-muted-foreground font-normal text-left">Last Scan</span>
                                            {scan.lastScan}
                                        </td>
                                    )}
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-muted-foreground">
                                        No scans found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination/Footer */}
                <div className="flex items-center justify-between p-4 border-t border-border mt-auto">
                    <span className="text-sm text-muted-foreground">Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredScans.length)} of {filteredScans.length} Scans</span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        >
                            <ChevronLeft className="size-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-8"
                            disabled={currentPage >= totalPages}
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        >
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
