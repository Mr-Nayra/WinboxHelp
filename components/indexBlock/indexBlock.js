import React from "react";
import Link from "next/link";
import styles from "./indexBlock.module.css";

const indexBlock = (props) => {
  return (
    <Link href={`/collections/${props.fileName}`}>
      <a className={styles.box}>
        <img src="/LogoCutout.png" className={styles.boximage} />
        <div>
          <h2 className={styles.boxHeading}>{props.title}</h2>
          <div className={styles.aboutauthorcontainer}>
            <img src="/LogoCutout.png" className={styles.boxLogo} />
            <div>
              <p>{props.articles} articles written in this collection</p>
              <p>
                <span> Written by </span>
                {props.writer}
              </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default indexBlock;
