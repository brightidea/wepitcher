import Head from 'next/head'
import PitchDeckCard from '../../components/pitchDeckCard';
import styles from '../../styles/Decks.module.css'

export default function Decks({ profiles }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Explore Pitch Decks | WePitcher - Amazing Pitch Decks</title>
        <meta name="description" content="A Demo of my skills for the wefunder team :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.pageBody}>
        <div className={styles.main}>
          <h1 className={styles.title}>
            Explore Pitch Decks
          </h1>
          <div className={styles.decksContainer}>
            {profiles.users.map((profile, index) => (
              <PitchDeckCard key={index} profile={profile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "users")
  const profiles = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      profiles,
    },
  }
}
