export default function AuthLayout({ children }) {
    return (
        <main className="w-full min-h-[100dvh] flex items-center justify-center bg-white dark:bg-gray-900 sm:bg-blue-950 dark:sm:bg-slate-600">
            {children}
        </main>
    );
}
