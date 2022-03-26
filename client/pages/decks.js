import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function Decks() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Explore Pitch Decks | WePitcher - Amazing Pitch Decks</title>
        <meta name="description" content="A Demo of my skills for the wefunder team :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageBody}>
        <Navbar />
        <main className={styles.main}>
          {/* <h1 className={styles.title}>
            Welcome to <Image src="/wepitcher-logo.png" alt="WePitcher Logo" width={280} height={76} />
          </h1> */}
          
        </main>
      </div>
      <Footer />
    </div>
  )
}
