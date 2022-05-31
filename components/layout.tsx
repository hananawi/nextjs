import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";

const name = "hananawi";
export const siteName = "Learning Next.js";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteName} />
        <meta name="og:type" content="website" />
        <meta name="og:image" content="" />
        <meta name="og:url" content="" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {children}
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </div>
  );
}
