import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const inter=Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "GearHive",
  description: "Find the best deals on wheels",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} `}
        >
          {/* header */}
          <Header />
          {/* main */}
          <main className=" bg-gray-100 flex flex-col min-h-screen">
          {children}
          </main>
          {/* footer */}
          <footer className="flex justify-center items-center h-16 bg-gray-800 text-white">
            <div className="container mx-auto px-4 text-center text-gray-200">
              <p>
              Ultimate car deals  
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
