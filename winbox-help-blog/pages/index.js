import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import BoxArrow from "./Icons/Box&Arrow";
import Logo from "./Icons/Logo";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Winbox Help</title>
        <meta name="description" content="Winbox help app" />
        <link rel="icon" href="/LogoCutout.png" />
      </Head>

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoCont}>
            <Logo color="white" width={100} />
            <a className={styles.headerLink} href="https://getwinbox.co/">
              <BoxArrow />
              <p>Go to WinBox</p>
            </a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <a className={styles.box}>
            <img src="/LogoCutout.png" className={styles.boximage} />
            <div>
              <h2 className={styles.boxHeading}>Get Started</h2>
              <div className={styles.aboutauthorcontainer}>
                <img src="/LogoCutout.png" className={styles.boxLogo} />
                <div>
                  <p>3 articles written in this collection</p>
                  <p>
                    <span> Written by </span>Arthur
                  </p>
                </div>
              </div>
            </div>
          </a>
          <a className={styles.box}>
            <img src="/LogoCutout.png" className={styles.boximage} />
            <div>
              <h2 className={styles.boxHeading}>Get Started</h2>
              <div className={styles.aboutauthorcontainer}>
                <img src="/LogoCutout.png" className={styles.boxLogo} />
                <div>
                  <p>3 articles written in this collection</p>
                  <p>
                    <span> Written by </span>Arthur
                  </p>
                </div>
              </div>
            </div>
          </a>
          <a className={styles.box}>
            <img src="/LogoCutout.png" className={styles.boximage} />
            <div>
              <h2 className={styles.boxHeading}>Get Started</h2>
              <div className={styles.aboutauthorcontainer}>
                <img src="/LogoCutout.png" className={styles.boxLogo} />
                <div>
                  <p>3 articles written in this collection</p>
                  <p>
                    <span> Written by </span>Arthur
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}
