import styles from './page.module.css'
import ResponsiveAppBar from "./responsive-app-bar"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={styles.main}>
      <ResponsiveAppBar />
      { children }
    </main>
  )
}