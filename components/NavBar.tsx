"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const user={}

function NavBar() {
    const router=useRouter()
  return (
    
    <header className='navbar '>
        <nav>
            <Link href="/">
            <img src="/assets/icons/logo.svg" alt="Logo" width={32} height={32} />
            <h1>SnapCast</h1>
            </Link>

            {user&&(
                <figure>
                    <button onClick={()=>{
                        router.push('/profile/123')
                    }}>
                        <Image src="/assets/images/dummy.jpg" alt="profile" height={36} width={36} className='rounded-full aspect-square' />
                    </button>
                    <button className='cursor-pointer '>
                        <Image src="/assets/icons/logout.svg" alt="logout" width={24} height={24} className='rotate-180' />

                    </button>
                </figure>
            )}
        </nav>

    </header>
  )
}

export default NavBar