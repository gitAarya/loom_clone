import React from 'react'
import Link from 'next/link'
const user={}

function NavBar() {
  return (
    
    <header className='navbar '>
        <nav>
            <Link href="/">
            <img src="/assets/icons/logo.svg" alt="Logo" width={32} height={32} />
            <h1>SnapCast</h1>
            </Link>

            {user&&(
                <figure>
                    <button>
                        <img src="/assets/images/dummy.jpg" alt="profile" height={36} width={36} className='rounded-full aspect-square' />
                    </button>
                    <button className='cursor-pointer '>
                        <img src="/assets/icons/logout.svg" alt="logout" width={24} height={24} className='rotate-180' />

                    </button>
                </figure>
            )}
        </nav>

    </header>
  )
}

export default NavBar