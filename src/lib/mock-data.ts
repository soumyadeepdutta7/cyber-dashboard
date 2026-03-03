export type ScanStatus = "Completed" | "Scheduled" | "Failed" | "Running";

export interface ScanRun {
    id: string;
    name: string;
    type: string;
    status: ScanStatus;
    progress: number;
    vulnerabilities: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
    lastScan: string;
}

export const mockScans: ScanRun[] = [
    { id: "1", name: "Web App Servers", type: "Greybox", status: "Completed", progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: "4d ago" },
    { id: "2", name: "Internal APIs", type: "Blackbox", status: "Running", progress: 65, vulnerabilities: { critical: 1, high: 3, medium: 10, low: 2 }, lastScan: "Now" },
    { id: "3", name: "Network Infrastructure", type: "Whitebox", status: "Failed", progress: 15, vulnerabilities: { critical: 0, high: 0, medium: 1, low: 0 }, lastScan: "1d ago" },
    { id: "4", name: "Mobile API Sandbox", type: "Greybox", status: "Scheduled", progress: 0, vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 }, lastScan: "-" },
    { id: "5", name: "Payment Gateway", type: "Greybox", status: "Completed", progress: 100, vulnerabilities: { critical: 0, high: 1, medium: 4, low: 12 }, lastScan: "5d ago" },
    { id: "6", name: "Legacy Portal", type: "Blackbox", status: "Completed", progress: 100, vulnerabilities: { critical: 12, high: 45, medium: 80, low: 112 }, lastScan: "1w ago" },
];

export const mockDashboardStats = {
    critical: { count: 86, change: "+2%", isIncrease: true },
    high: { count: 16, change: "+0.9%", isIncrease: true },
    medium: { count: 26, change: "-0.9%", isIncrease: false },
    low: { count: 16, change: "+0.9%", isIncrease: true },
    org: "Project X",
    owner: "Nammagiri",
    totalScans: 100,
    scheduled: 1000,
    rescans: 100,
    failed: 100,
    lastUpdated: "10 mins ago"
};

export const mockSteps = [
    { id: "spidering", label: "Spidering", active: true },
    { id: "mapping", label: "Mapping", active: false },
    { id: "testing", label: "Testing", active: false },
    { id: "validating", label: "Validating", active: false },
    { id: "reporting", label: "Reporting", active: false },
];

export const mockTerminalLogs = [
    { time: "09:00:00", text: "I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration.", highlight: "helpdesk.democorp.com" },
    { time: "09:01:00", text: "Good! target is online. Now let me perform port scanning to identify running services." },
    { time: "09:02:00", text: "Excellent reconnaissance results:\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure." },
    { time: "09:03:00", text: "Great! I found a login page for a Help Desk Platform. I can see a useful comment: \"TODO: Delete the testing account (test:test)\". Let me test this credential. The login redirects to /password/test. Let me follow that path and explore it.", codeNode: "TODO: Delete the testing account (test:test)", highlightUrl: "/password/test" },
    { time: "09:04:00", text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to '#' which means the current page. Let me try a different approach.", highlightUrl: "/password/test", highlightString: "'#'" },
    { time: "09:05:00", text: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the test:test password directly on other endpoints.", highlightUrl: "/password/test", highlightKeyword: "/api", hint: "test:test" },
    { time: "09:06:00", text: "Great! I can access the dashboard using the 'X-UserId: 10032' header. The dashboard shows \"Welcome, John Doe\". This suggests an **IDOR vulnerability** - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application...", codeHighlight: "'X-UserId: 10032'", boldHighlight: "**IDOR vulnerability**" },
];

export const mockFindings = [
    { id: 1, severity: "Critical", title: "SQL Injection in Authentication Endpoint", path: "/api/users/profile", desc: "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.", time: "10:45:23", variant: "critical" },
    { id: 2, severity: "High", title: "Unauthorized Access to User Metadata", path: "/api/auth/login", desc: "Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.", time: "18:45:23", variant: "high" },
    { id: 3, severity: "Medium", title: "Broken Authentication Rate Limiting", path: "/api/search", desc: "No effective rate limiting detected on login attempts. Automated brute-force attempts possible.", time: "18:45:23", variant: "medium" },
];
