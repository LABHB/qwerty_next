import Head from "next/head";
import styles from "./layout.module.css"
import utilStyles from "../../styles/utils.module.css"
import Link from "next/link";
import { Image } from "@chakra-ui/react";


const name = "Tadashi Enoki"

export const siteTitle = "QWERTY TOP"

function Layout({children, home}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/fabicon.ico"></link>
      </Head>
      <header className={styles.header}>
        {home ? ( //Topの場合のヘッダー
          <>
        <Image src="/logo.png" className={utilStyles.borderCircle}/>
        {/* 仮ロゴ */}
        <h1 className={`${utilStyles.heading2Xl} ${styles.headerHomeImage}`}>{name}</h1>
          </>
        ) :
        (//Top以外の場合のヘッダー
        <>
        <img src="/logo.png" className={utilStyles.borderCircle}/>
        {/* 仮ロゴ */}
        <h1 className={`${utilStyles.heading2Xl}`}>{name}</h1>
        </>
        ) 
        }
      </header>
      <main>{children}</main>
      {!home &&(
        <div>
          <Link href="/">←ホームに戻る
          </Link>
        </div>
      )}
    </div>
  );
}

export default Layout;