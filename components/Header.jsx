import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async ({ isAdminPage = false }) => {
  const user = await checkUser();
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-gradient-to-br from-purple-100/10 to-purple-100/30 backdrop-blur-md border-b border-white/30 shadow-lg">
      <nav className="max-w-[150rem] mx-auto px-6 sm:px-10 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link
          href={isAdminPage ? "/admin" : "/"}
          className="flex items-center gap-3 group"
        >
          <Image
            src="/gearhive_logo.png"
            alt="GearHive Logo"
            width={150}
            height={60}
            className="transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
          />
          {isAdminPage && (
            <span className="text-sm uppercase text-cyan-600 font-semibold tracking-widest">
              Admin
            </span>
          )}
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {isAdminPage ? (
            <Link href="/">
              <Button
                variant="ghost"
                className="bg-white/30 text-slate-900 hover:bg-cyan-100/50 border border-white/30 shadow-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to App</span>
              </Button>
            </Link>
          ) : (
            <SignedIn>
              <Link href="/saved-cars">
                <Button className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white hover:scale-105 transition-transform shadow-lg">
                  <CarFront className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Saved Cars</span>
                </Button>
              </Link>

              {isAdmin ? (
                <Link href="/admin">
                  <Button
                    variant="ghost"
                    className="text-slate-900 bg-white/30 border border-white/30 hover:bg-white/50 shadow-sm"
                  >
                    <Layout className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Admin Portal</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/reservations">
                  <Button
                    variant="ghost"
                    className="text-slate-900 bg-white/30 border border-white/30 hover:bg-white/50 shadow-sm"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">My Reservations</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            <SignInButton>
              <Button
                variant="ghost"
                className="text-slate-900 bg-white/30 border border-white/30 hover:bg-white/50 shadow-sm"
              >
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-2 ring-purple-400 rounded-full transition-transform hover:scale-110",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
