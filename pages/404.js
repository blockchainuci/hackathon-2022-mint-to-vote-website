import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link"

export default function Instructions() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Dance!</title>
                <meta name="description" content="Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...we’re here to do just that." />
                <link rel="icon" href="/logo.png" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    404
                </h1>
                <p>While you're here, why not watch the video that basically fueled development?</p>
                <p><a href="/">Go back home</a></p>

                <iframe width="560" height="315" src="https://www.youtube.com/embed/FT91CrPPAqc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </main>
        </div>
    )
}