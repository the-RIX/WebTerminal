import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import logoPic from "../public/GitHub-Mark-64px.png"


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>No Brain No Pain Business</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/faviconn.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="/terminal/terminal.tsx"><Image src="/piggypng.png" height={300} width={480} alt='Nö'></Image></a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        
        <Link href="https://github.com/the-RIX/WebTerminal">
          <a
          target="_blank"
          //rel="noopener noreferrer"
          > Powered by{' '}
            <span className={styles.logo}>
              <Image src={logoPic} alt="GitHub Logo" width={24} height={24} />
            </span>
          </a>
        </Link>
      </footer>
    </div>
  )
}

export default Home
