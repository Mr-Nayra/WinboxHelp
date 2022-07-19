import Head from "next/head";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import BoxArrow from "./Icons/Box&Arrow";
import Logo from "./Icons/Logo";
import url from "../util/url";
import IndexBlock from "../components/indexBlock/indexBlock";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(url + "api/getblog")
      .then((res) => {
        return res.json();
      })
      .then((parsed) => {
        setBlogs(parsed);
      });
  }, []);

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
          {blogs.map((item) => (
            <IndexBlock
              fileName={item.fileName}
              title={item.title}
              articles={item.collections.length}
              writer={item.writer}
              key={item.title}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
