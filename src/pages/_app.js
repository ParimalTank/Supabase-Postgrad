import '@/styles/globals.css'
import Link from 'next/link'

export default function App({ Component, pageProps }) {
  return (
    <>
      <nav>
        <h1>Supabase</h1>
        <Link href="/">Home</Link>
        <Link href="/create">Create New Smoothie</Link>
      </nav>
      <Component {...pageProps} />
    </>
  )
}
