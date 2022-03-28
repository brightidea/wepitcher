import React, { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import styles from '../styles/Home.module.css';
import { UserContext } from '../context/UserContext';

export default function Home() {
  const [userContext, setUserContext] = useContext(UserContext)
  console.log(userContext);
  return (
    <div className={styles.container}>
      <Head>
        <title>WePitcher - Amazing Pitch Decks</title>
        <meta name="description" content="A Demo of my skills for the wefunder team :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.backgroundContainer}></div>

      <div className={styles.main}>
        <h1 className="mb-8">
          Welcome to <Image src="/wepitcher-logo.png" alt="WePitcher Logo" width={280} height={76} />
        </h1>
        <div className="hero-buttons inline-flex">
          <Link href="/login">
            <button className="wepitcherButton">
              Login
            </button>
          </Link>
          <div className="mt-8">or</div>
          <Link href="/register">
          <button className="wepitcherButton">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
