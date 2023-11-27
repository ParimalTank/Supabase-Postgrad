import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <nav>
        <h1>Supabase</h1>
        <a href="/">Home</a>
        <a href="/create">Create New Smoothie</a>
      </nav>
      <Component {...pageProps} />
    </>
  )
}
