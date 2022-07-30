import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Head from "next/head";
import Link from "next/link";

import styles from "../../styles/blogPage.module.css";
import BoxArrow from "../Icons/Box&Arrow";
import Logo from "../Icons/Logo";
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
        <title>Winbox Help Center</title>
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
        <div className={styles.navcont}>
          <nav className={styles.nav}>
            <Link href="/">
              <a>All Collections</a>
            </Link>
            <p>&gt;</p>
            <Link href={`/collections/${props.parent}`}>
              <a>{props.parentName}</a>
            </Link>
            <p>&gt;</p>
            <p>{article && article.title}</p>
          </nav>
        </div>
        <div className={styles.container}>
          <div className={styles.container2}>
            <div className={styles.division}>
              <div>
                <h2 className={styles.divisionheading}>
                  {article && article.title}
                </h2>
                <div className={styles.aboutauthorcontainer}>
                  <img src="/LogoCutout.png" className={styles.boxLogo} />
                  <div>
                    <p>
                      <span> Written by </span>
                      {article && article.writenBy}
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
  let data = await fs.promises.readdir("data");
  let allBlogs = [];
  let myfile;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    myfile = await fs.promises.readFile(`data/${item}`);
    let file = JSON.parse(myfile);
    for (let j = 1; j <= file.collections.length; j++) {
      let length = j >= 10 ? "" + j : "0" + j;
      allBlogs.push({ params: { pid: file.fileName + length } });
    }
  }

  return {
    paths: allBlogs,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { pid } = context.params;
  const file = pid.slice(0, pid.length - 2);
  const data = pid.slice(pid.length - 2, pid.length);

  let myBlog = await fs.promises.readFile(`data/${file}.json`, "utf-8");
  const blogparent = JSON.parse(myBlog);

  return {
    props: {
      myBlog: blogparent.collections[data - 1],
      parent: blogparent.fileName,
      parentName: blogparent.title,
    },
  };
}
