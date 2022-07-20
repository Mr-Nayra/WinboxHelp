import React from "react";
import Link from "next/link";

import styles from "./collectionBlock.module.css";

const CollectionBlock = (props) => {
  return (
    <Link
      href={`/articles/${props.fileName}${
        props.index < 10 ? "0" + props.index : props.index
      }`}
    >
      <a className={styles.box}>
        <div>
          <h2 className={styles.boxHeading}>{props.title}</h2>
          <div className={styles.aboutauthorcontainer}>
            <img src="/LogoCutout.png" className={styles.boxLogo} />
            <div>
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

export default CollectionBlock;
