import Head from "next/head";
import styles from "../styles/Home.module.css";

import NavBar from "../components/NavBar";
import HomeContent from "../components/HomeContent";
import Footer from "../components/Footer";

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
                    <div className={styles.title}>Takeoff 🚀</div>
                    <div className={styles.quote}>Random quote iz pile-a</div>
                </div>
                <div className={styles.contentblock}>
                    <div className={styles.searchcontainer}>
                        <input type="search" id="flightSearch" name="q" aria-label="Search flights" className={styles.searchbox} placeholder="Find a flight"></input>
                    </div>
                    <HomeContent></HomeContent>
                    <Footer></Footer>
                </div>
            </main>
        </div>
    );
}
