import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link"

export default function Instructions() {
    return (
        <div className={styles.container}>
            <Head>
                <title>How to connect MetaMask to HarmonyOne&apos; mainnet</title>
                <meta name="description" content="Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...we’re here to do just that." />
                <link rel="icon" href="/logo.png" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    How to connect MetaMask to HarmonyOne&apos;s mainnet
                </h1>

                <p className={styles.description} id="1">
                <p><b>1. Adding a Custom RPC Endpoint</b><br></br>
                    In order to connect to the Harmony Network, a custom RPC Endpoint needs to be added.<br/>
                    On your browser, click the MetaMask extension <Image src="/metamask.svg" alt="GitHub Logo" width={32} height={16} /><br/>
                    Then, click the name of the network you&apos;re on and click the &quot;Add Network&quot; button<br/>
                    <Image src="/addnetwork.png" alt="Add a MetaMask network" width={325} height={580}/></p>
                </p>

                <p className={styles.description} id="2">
                <p><b>2. Filling the Endpoint Information</b><br></br>
                    Network Name: <code className={styles.code}>Harmony Mainnet</code><br/>
                    New RPC URL: <code className={styles.code}>https://api.harmony.one</code><br/>
                    Chain ID: <code className={styles.code}>1666600000</code><br/>
                    Currency symbol: <code className={styles.code}>ONE</code><br/>
                    Block Explorer URL: <code className={styles.code}>https://explorer.harmony.one/</code><br/>
                    Then, click the&quot;Save&quot; button<br/>
                    <Image src="/addanetwork.png" alt="Add a MetaMask network" width={800} height={580}/></p>
                </p>

                <p className={styles.description} id="3">
                <p><b>3. Head back to the <Link href="/">main site</Link>, you did it!</b><br></br>
                    <h2>🎉</h2>
                    </p>
                </p>
            </main>
        </div>
    )
}