import Image from "next/image"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <div className="flex h-full flex-col justify-center items-center bg-white">
      <h1 className="text-4xl mb-5 font-bold">Este es el home, hacer un logo y linkear esta page en click</h1>
      <span className="text-7xl">🏡</span>
    </div>
  )
}
