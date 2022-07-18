import "../styles/globals.css";
import styles from "../styles/app.module.css";
import Logo from "./Icons/Logo";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className="flexcenter">
            <Logo width={100} />
          </div>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
