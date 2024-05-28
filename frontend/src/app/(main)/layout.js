export default function HomeLayout({ children }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100 dark:bg-gray-800">
            {children}
        </div>
    );
}