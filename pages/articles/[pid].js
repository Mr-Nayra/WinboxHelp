import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Head from "next/head";
import styles from "../../styles/blogPage.module.css";
import BoxArrow from "../Icons/Box&Arrow";
import Logo from "../Icons/Logo";
import url from "../../util/url";
import * as fs from "fs";

export default function Home(props) {
  const router = useRouter();
  const [article, setArticle] = useState(props.myBlog);

  const createMarkup = (c) => {
    return { __html: c };
  };

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
            {article && (
              <div
                dangerouslySetInnerHTML={createMarkup(article.content)}
              ></div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "01-Get Started", index: 1 } },
      { params: { pid: "01-Get Started", index: 2 } },
      { params: { pid: "01-Get Started", index: 3 } },
      { params: { pid: "02-Add A New Inbox" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { pid } = context.params;

  let myBlog = await fs.promises.readFile(`data/${pid}.json`, "utf-8");
  return {
    props: { myBlog: JSON.parse(myBlog).collections[0] },
  };
}
