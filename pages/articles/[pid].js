import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Head from "next/head";
import styles from "../../styles/blogPage.module.css";
import BoxArrow from "../Icons/Box&Arrow";
import Logo from "../Icons/Logo";
import url from "../../util/url";

export default function Home() {
  const router = useRouter();
  const { pid, index } = router.query;
  const [article, setArticle] = useState([]);

  useEffect(() => {
    fetch(url + `api/blogs?slug=${pid}`)
      .then((res) => {
        return res.json();
      })
      .then((parsed) => {
        if (parsed.collections) {
          setArticle(parsed.collections[index - 1]);
        }
      });
  }, [router.isReady, pid, index]);

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
        {/* <nav>
          <Link href="/">All Collections</Link> >
          <Link href=`/Article/``
        </nav> */}
        <div className={styles.container}>
          <div className={styles.container2}>
            <div className={styles.division}>
              <div>
                <h2 className={styles.divisionheading}>{article.title}</h2>
                <div className={styles.aboutauthorcontainer}>
                  <img src="/LogoCutout.png" className={styles.boxLogo} />
                  <div>
                    <p>
                      <span> Written by </span>
                      {article.writenBy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p>{article.content}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
