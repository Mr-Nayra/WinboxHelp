import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Head from "next/head";
import styles from "../../styles/heirarchy.module.css";
import BoxArrow from "../Icons/Box&Arrow";
import Logo from "../Icons/Logo";
import url from "../../util/url";
import CollectionBlock from "../../components/collectionBlock/collectionBlock";

let collections = "";

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    const { pid } = router.query;

    fetch(url + `api/blogs?slug=${pid}`)
      .then((res) => {
        return res.json();
      })
      .then((parsed) => {
        collections = parsed;
        setArticles(parsed.collections);
      });
  }, [router.isReady]);

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
            <a className={styles.headerLink}>
              <BoxArrow />
              <p>Go to WinBox</p>
            </a>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.container2}>
            <div className={styles.division}>
              <img src="/LogoCutout.png" className={styles.boximage} />
              <div>
                <h2 className={styles.divisionheading}>{collections.title}</h2>
                <div className={styles.aboutauthorcontainer}>
                  <img src="/LogoCutout.png" className={styles.boxLogo} />
                  <div>
                    <p>
                      {articles && articles.length} articles written in this
                      collection
                    </p>
                    <p>
                      <span> Written by </span>
                      {collections.writer}
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
