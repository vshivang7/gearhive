import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ArrowLeft, CarFront, Heart, Layout } from 'lucide-react'

const Header = async ({isAdminPage=false}) => {
    const isAdmin = false;
  return (
    <header className='fixed top-0 h-fit w-full bg-white backdrop-blur-md z-50 border-b text-black p-4'>
        <nav className='mx-auto px-4 py-4 flex justify-between items-center'>
            <Link href={isAdminPage?"/admin" : "/"} className='flex'>
                <Image src={"/logo.png"} alt="Throtl Logo" width={205} height={60} />
                {
                    isAdminPage&&(<span className='text-xs font-extralight'>admin</span>)
                }
            </Link>

            <div className='flex items-center space-x-4'>
                {isAdminPage?
                    (<Link href="/">
                        <Button variant="outline" className="flex items-center gap-2">
                            <ArrowLeft size={18}/>
                            <span className="hidden md:inline">Back to App</span>
                        </Button>
                    </Link>)
                    :(
                    <SignedIn>
                        <Link href="/saved-cars">
                            <Button >
                                <CarFront size={18}/>
                                <span className="hidden md:inline">Saved Cars</span>
                            </Button>
                        </Link>
                        {isAdmin ? (
                        <Link href="/admin">
                            <Button variant="outline">
                                <Layout size={18}/>
                                <span className="hidden md:inline">Admin Portal</span>
                            </Button>
                        </Link>
                        ) : (
                        <Link href="/reservations">
                            <Button variant="outline">
                                <Heart size={18}/>
                                <span className="hidden md:inline">My Reservations</span>
                            </Button>
                        </Link>
                        )}
                    </SignedIn>
                    )}
                <SignedOut>
                    <SignInButton>
                        <Button variant="outline">Login</Button>
                    </SignInButton>
                </SignedOut> 
                <SignedIn>
                    <UserButton appearance={{
                        elements:{
                            avatarBox:"w-10 h-10",
                        }
                    }}/>
                </SignedIn>
            </div>
        </nav>
    </header>
  )
}

export default Header