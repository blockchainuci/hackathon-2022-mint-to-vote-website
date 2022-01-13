import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useMetamask } from "use-metamask";
import { FaDna, FaRobot, FaInfinity } from "react-icons/fa";
import Web3 from "web3";
import styles from "../styles/Home.module.css";
import ProposalContract from "../contracts/Proposal";
import Eth from "ethjs-query"
import EthContract from "ethjs-contract"


export default function Home() {
  const { connect, metaState } = useMetamask();
  const [balance, setBalance] = useState();
  const [onh, setOnh] = useState(false);
  const [onnet, setOnnet] = useState("Harmony Testnet");
  const [votes, setVotes] = useState();

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
        let _onh;
        let _onnet;
        if (web3?.eth) {
          _balance = await metaState.web3.eth.getBalance(metaState.account[0]);
        } else {
          _balance = await metaState.web3.getBalance(metaState.account[0]);
        }
        const harmonyShards = [1666600000, 1666600001, 1666600002, 1666600003, 1666700000, 1666700001, 1666700002, 1666700003]
        const mainnetShards = [1666600000, 1666600001, 1666600002, 1666600003]
        if (harmonyShards.indexOf(parseInt(metaState.chain.id)) != -1) {
          _onh = true;
          setOnh(true);
          console.log(_onh);
          if (mainnetShards.indexOf(parseInt(metaState.chain.id)) != -1) {
            _onnet = "Harmony Mainnet";
            setOnnet("Harmony Mainnet");
          }
          else {
            _onnet = "Harmony Testnet";
            setOnnet("Harmony Testnet");
          }
        }
        else {
          _onh = false;
          setOnh(false)
        }
        setBalance(parseFloat(_balance / 10 ** 18).toFixed(3));
        function startApp(web3) {
          const eth = new Eth(web3.currentProvider);
          const contract = new EthContract(eth);
          initContract(contract);
        }
        const address = "0xe7a24f6d77b8a9d939a1e11dfb9a05ad347d2bbd"
        function initContract(contract) {
          const MiniToken = contract(ProposalContract["abi"]);
          const miniToken = MiniToken.at(address);
          console.log(miniToken)
          if (onh) {
            listenForClicksOnOne(miniToken);
            listenForClicksOnTwo(miniToken);
          }
          return
        }
        function listenForClicksOnOne(miniToken) {
          var button = document.getElementById("candidate-one")
          button.addEventListener('click', function () {
            return miniToken.vote(0, { from: metaState.account[0] }).then(function (txHash) {
              console.log('Transaction sent')
              console.dir(txHash)
              waitForTxToBeMined(txHash)
            }).catch(console.error)
          }, false)
        }
        function listenForClicksOnTwo(miniToken) {
          var button = document.getElementById("candidate-two")
          button.addEventListener('click', function () {
            return miniToken.vote(1, { from: address }).then(function (txHash) {
              console.log('Transaction sent')
              console.dir(txHash)
              waitForTxToBeMined(txHash)
            }).catch(console.error)
          }, false)
        }
        startApp(web3);
        async function waitForTxToBeMined(txHash) {
          let txReceipt;
          while (!txReceipt) {
            try { txReceipt = await Eth.getTransactionReceipt(txHash) }
            catch (err) { return indicateFailure(err) }
          }
          indicateSuccess()
        }
      })();
    }
  }, [metaState]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Mint to Vote</title>
        <meta name="description" content="Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...we’re here to do just that." />
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Mint To Vote
        </h1>
        <p className={styles.description}>
          Voting should be easy, transparent, trustless and effecient. With a unique Blockchain based Mint to Vote system...<br /><b>We&apos;re here to do just that.</b></p>
        <br />
        <Image src="/logo.png" alt="logo" width="200" height="200" />

        {onh ? (
          <p className={styles.description}>
            Đapp connected to the {" "}
            <code className={styles.code}>
              {onnet}
            </code> on the wallet{""}
            <code className={styles.code}>{metaState.account[0]}</code>
            {/* options are {""}
            <code className={styles.code}>{votes}</code> */}
          </p>
        ) : (
          <p className={styles.description}>
            <b>Not connected to HarmonyOne&apos;s<br />mainnet via MetaMask.</b><br />Let&apos;s fix that!<br />
            <ol>
              <li><p>Make sure <a href="https://metamask.io/download">MetaMask</a> is installed</p></li>
              <li><p><a href="/metamask-harmony">Add HarmonyOne&apos;s mainnet <Image src="/harmonyone.svg" alt="GitHub Logo" width={32} height={16} /></a></p></li>
              <li><p>Click the MetaMask extension
                <Image src="/metamask.svg" alt="GitHub Logo" width={32} height={16} />
              </p></li>
            </ol>
          </p>
        )}
        {onh ? (
          <div className={`${styles.grid} ${styles.gridCandidates}`}>

            <div className={styles.card}>
              <h2>Candidate 1 &rarr;</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum congue libero, ac euismod eros tempus hendrerit.</p>
              <a className={styles.fancy} id="candidate-one">
                <span className={styles.topkey}></span>
                <span className={styles.buttontext}>Vote</span>
                <span className={styles.bottomkey1}></span>
                <span className={styles.bottomkey2}></span>
              </a>
            </div>

            <div id="candidate-two" className={styles.card}>
              <h2>Candidate 2 &rarr;</h2>
              <p>Nam condimentum, mauris sed ullamcorper vestibulum, sem massa porttitor nisi, vel dictum metus turpis a ligula.</p>
              <a className={styles.fancy} id="candidate-two">
                <span className={styles.topkey}></span>
                <span className={styles.buttontext}>Vote</span>
                <span className={styles.bottomkey1}></span>
                <span className={styles.bottomkey2}></span>
              </a>
            </div>
          </div>) : (<br />)}

        <h1 className={styles.title}>
          The Advantages
        </h1>
        <div className={styles.grid}>
          <div className={styles.advantages}>
            <h2><FaDna size={20} color={'#02E4C0'} /> A single source of truth</h2>
            <p>To combat duplicate accounts or bots from overriding votes, we have implemented a seamless KYC process.</p>
          </div>
          <div className={styles.advantages}>
            <h2><FaRobot size={20} color={'#02E4C0'} /> KYC Proteted</h2>
            <p>Utilizing Harmony&apos;s Blockchain, voting can be done in a truly trustless enviroment ensuring the extinction of fradulent votes or miscounts.</p>
          </div>
          <div className={styles.advantages}>
            <h2><FaInfinity size={20} color={'#02E4C0'} /> Possibilities</h2>
            <p>With transaction feels amounting to ~$0.00001 per txn, and finality times in ~2 seconds this system is infintely scalable, fast and will cost signifigantly less than major campaigns.</p>
          </div>
        </div>

        <h1 className={styles.title}>
          Past Elections
        </h1>
        <p className={styles.description}>View the results of past elections, who the candidates were, why the ran, explore on chain data of votes, and the complete history of the election.</p>
        <div className={styles.examplesGrid}>
          <div className={styles.pastVoteImageHolder}>
            <Image className={styles.pastVoteImage} alt="Example past vote" src="/ex1.png" width={400} height={400} />
          </div>
          <div className={styles.pastVoteImageHolder}>
            <Image className={styles.pastVoteImage} alt="Example past vote" src="/ex2.png" width={400} height={400} />
          </div>
        </div>
        <a className={styles.fancy}>
          <span className={styles.topkey}></span>
          <span className={styles.buttontext}>Coming Soon</span>
          <span className={styles.bottomkey1}></span>
          <span className={styles.bottomkey2}></span>
        </a>
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
        </span>. Made by Kainoa Kanter, Ethan Nguyen, Anish Lathker, and Daniel Lee.
      </footer>
    </div>
  );
}
