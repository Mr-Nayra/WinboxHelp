import Head from "next/head";
import { useState } from "react";
import Script from "next/script";

import styles from "../styles/Home.module.css";
import BoxArrow from "./Icons/Box&Arrow";
import Logo from "./Icons/Logo";
import IndexBlock from "../components/indexBlock/indexBlock";
import * as fs from "fs";

export default function Home(props) {
  const [blogs, setBlogs] = useState(props.myBlogs);

  return (
    <div>
      <Head>
        <title>Winbox Help Center</title>
        <meta name="description" content="Winbox help app" />
        <link rel="icon" href="/LogoCutout.png" />
      </Head>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></Script>
      <Script
        nomodule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></Script>

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
              icon={item.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("data");
  let allBlogs = [];
  let myfile;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    myfile = await fs.promises.readFile(`data/${item}`);
    allBlogs.push(JSON.parse(myfile));
  }

  return {
    props: { myBlogs: allBlogs },
  };
}
