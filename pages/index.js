import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useMetamask } from "use-metamask";
import Web3 from "web3";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { connect, metaState } = useMetamask();
  const [balance, setBalance] = useState();
  useEffect(() => {
    if (!metaState.isConnected) {
      (async () => {
        try {
          await connect(Web3);
          await window.ethereum.enable();
        } catch (error) {
          console.log(error);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { account, isConnected, web3 } = metaState;
    if (account.length && isConnected && web3) {
      (async () => {
        let _balance;
        if (web3?.eth) {
          _balance = await metaState.web3.eth.getBalance(metaState.account[0]);
        } else {
          _balance = await metaState.web3.getBalance(metaState.account[0]);
        }
        setBalance(parseFloat(_balance / 10 ** 18).toFixed(3));
      })();
    }
  }, [metaState]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Mint to Vote</title>
        <meta name="description" content="Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...we’re here to do just that." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mint To Vote
        </h1>

        <p className={styles.description}>
        Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...<br/><b>We’re here to do just that.</b></p>

        {metaState.isConnected ? (
          <p className={styles.description}>
            Đapp connected to the {" "}
            <code className={styles.code}>
                {metaState.chain.id}
              </code> chain on the wallet{""}
            <code className={styles.code}>{metaState.account[0]}</code>
          </p>
        ) : (
          <p className={styles.description}>
            <b>Not connected to MetaMask.</b><br/>Let&apos;s fix that!<br/>
            <ol>
              <li><p>Make sure <a href="https://metamask.io/download">MetaMask</a> is installed</p></li>
              <li><p>Add <a href="https://docs.harmony.one/home/network/wallets/browser-extensions-wallets/metamask-wallet#installing-metamask">HarmonyOne&apos;s mainnet <Image src="/harmonyone.svg" alt="GitHub Logo" width={32} height={16} /></a></p></li>
              <li><p>Click the MetaMask extension
              <Image src="/metamask.svg" alt="GitHub Logo" width={32} height={16} />
              </p></li>
            </ol>
          </p>
        )}
        {metaState.isConnected ? (
        <div className={styles.grid}>
          <a href="" className={styles.card}>
            <h2>Candidate 1 &rarr;</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum congue libero, ac euismod eros tempus hendrerit.</p>
          </a>

          <a href="" className={styles.card}>
            <h2>Candidate 2 &rarr;</h2>
            <p>Nam condimentum, mauris sed ullamcorper vestibulum, sem massa porttitor nisi, vel dictum metus turpis a ligula.</p>
          </a>
        </div> ) : (<br/>)}
      </main>

      <footer className={styles.footer}>
        <span>
      <a
          href="https://github.com/blockchainuci/hackathon-2022-mint-to-vote-website"
          target="_blank"
          rel="noopener noreferrer"
        >
            <Image src="/github.svg" alt="GitHub Logo" width={32} height={16} /></a>
          </span>
          Powered by{" "}
          <span className={styles.logo}>
          <a
          href="https://harmony.one"
          target="_blank"
          rel="noopener noreferrer"
        >
            <Image src="/harmony.svg" alt="Harmony Logo" width={72} height={16} /></a>
          </span>. Made by Kainoa Kanter, Anish Lathker, Ethan Nguyen, and Daniel Lee.
      </footer>
    </div>
  );
}