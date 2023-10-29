import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "hota.dev",
  description: "About Hiroyuki Ota",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-2xl p-10 mx-auto">
          <header>
            <div className="container mx-auto flex justify-between items-baseline prose prose-a:no-underline">
              <Link href="/">
                <h1 className="">hota.dev</h1>
              </Link>
              <nav>
                <Link href="/" className="px-3">
                  Home
                </Link>
                <Link href="/playground" className="px-3">
                  Playground
                </Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
