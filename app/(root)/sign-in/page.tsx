import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            height={32}
            width={32}
            alt="logo"
          />
          <h1>SnapCast</h1>
        </Link>
        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="star"
                  height={20}
                  width={20}
                  key={index}
                />
              ))}
            </figure>
            <p>
              SnapCast makes screen recording easy . From quick walkthrough to
              full presentation ,Its fast ,smooth and shareable in seconds
            </p>
            <article>
              <Image
                src="/assets/images/jason.png"
                alt="jason"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2> jason Rivera</h2>
                <p>Product Designer,NovaByte</p>
              </div>
            </article>
          </section>
        </div>
        <p> ©️ SnapCast {new Date().getFullYear()}</p>
      </aside>
      <aside className="google-sign-in">
        <section>
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              height={40}
              width={40}
              alt="logo"
            />
            <h1>SnapCast</h1>
          </Link>
          <p>
            Create and Share your very first <span>SnapCast Video</span>in no
            time!
          </p>
          <button className='bg-red-300'>
            <Link href="/login">
              <span>Login</span>
            </Link>
          </button>
          <button className='bg-red-300'>
            <Link href="/login">
              <span>Register</span>
            </Link>
          </button>
        </section>
      </aside>
      <div className="ovelay" />
    </main>
  );
}

export default page