'use client'
import styles from './page.module.css'
import ResponsiveAppBar from './responsive-app-bar'

export default function Home() {
  return (
    <main className={styles.main}>
      <ResponsiveAppBar />
      Home Page
    </main>
  )
}