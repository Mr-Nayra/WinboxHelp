import Head from "next/head";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";
import BoxArrow from "./Icons/Box&Arrow";
import Logo from "./Icons/Logo";
import url from "../util/url";
import IndexBlock from "../components/indexBlock/indexBlock";
import * as fs from "fs";

export default function Home(props) {
  const [blogs, setBlogs] = useState(props.myBlogs);

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
