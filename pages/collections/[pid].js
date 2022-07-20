import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

import Head from "next/head";
import styles from "../../styles/heirarchy.module.css";
import BoxArrow from "../Icons/Box&Arrow";
import Logo from "../Icons/Logo";
import CollectionBlock from "../../components/collectionBlock/collectionBlock";
import * as fs from "fs";

export default function Home(props) {
  const router = useRouter();
  const [articles, setArticles] = useState(props.collections);
  let collections = props.myBlog;

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
            <a className={styles.headerLink}>
              <BoxArrow />
              <p>Go to WinBox</p>
            </a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.navcont}>
          <nav className={styles.nav}>
            <Link href="/">
              <a>All Collections</a>
            </Link>
            <p>&gt;</p>
            <p>{collections && collections.title}</p>
          </nav>
        </div>
        <div className={styles.container}>
          <div className={styles.container2}>
            <div className={styles.division}>
              <div className={styles.boximage}>
                <ion-icon name={collections && collections.icon}></ion-icon>
              </div>
              <div>
                <h2 className={styles.divisionheading}>
                  {collections && collections.title}
                </h2>
                <div className={styles.aboutauthorcontainer}>
                  <img src="/LogoCutout.png" className={styles.boxLogo} />
                  <div>
                    <p>
                      {articles && articles.length} articles written in this
                      collection
                    </p>
                    <p>
                      <span> Written by </span>
                      {collections && collections.writer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {articles &&
                articles.map((item, index) => {
                  var index = index + 1;
                  return (
                    <CollectionBlock
                      title={item.title}
                      writer={item.writenBy}
                      fileName={collections.fileName}
                      index={index}
                      key={item.title}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  let data = await fs.promises.readdir("data");
  data = data.map((item) => {
    return { params: { pid: item.split(".")[0] } };
  });
  return {
    paths: data,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { pid } = context.params;

  let myBlog = await fs.promises.readFile(`data/${pid}.json`, "utf-8");
  let blog = JSON.parse(myBlog);
  return {
    props: { myBlog: blog, collections: blog.collections },
  };
}
