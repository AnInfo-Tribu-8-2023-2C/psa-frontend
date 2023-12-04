import Image from "next/image"
import { Inter } from "next/font/google"
import styles from '@/pages/home.module.css'

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <div className={styles.fondoDiv}>
    <div className='flex content-center grid'>
      <h1 className="text-4xl mb-5 font-bold content-center">Praxis Systems Argentina</h1>
    <div className='flex conten-center  grid'>
      <h4 className="text-1xl mb-5 font-bold content-center">Utilice el menú que se encuentra a su izquierda para navegar por la página</h4>
    </div>
    </div>
    </div>
  )
}
