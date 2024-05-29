import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "CineGo",
    description: "La mejor plataforma para comprar boletos de cine en línea",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <AuthContextProvider>
                <body className={inter.className}>{children}</body>
            </AuthContextProvider>
        </html>
    );
}
