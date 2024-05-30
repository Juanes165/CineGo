import { Header } from '@/components';

export default function HomeLayout({ children }) {
    return (
        <div className="min-h-screen">
            <Header />
            {children}
        </div>
    );
}