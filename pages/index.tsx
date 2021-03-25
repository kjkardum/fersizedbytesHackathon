import Head from "next/head";
import styles from "../styles/Home.module.css";

import NavBar from "../components/NavBar"

export default function Home() {
    return (
    <div className={styles.container}>
      <Head>
        <title>Takeoff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar></NavBar>
      <main className={styles.main}>
        <div className={styles.topblock}>
          <div className={styles.title}>
            Takeoff 🚀
          </div>
          <div className={styles.quote}>
            Random quote iz pile-a
          </div>
        </div>
        <div className={styles.contentblock}>
          <div className={styles.searchcontainer}>
            <input
              type="search"
              id="flightSearch"
              name="q"
              aria-label="Search flights"
              className={styles.searchbox}
              placeholder="Find a flight"></input>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
    );
}
