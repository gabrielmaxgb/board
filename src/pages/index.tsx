import style from "../styles/styles.module.scss";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando tarefas</title>
      </Head>
      <div>
        <h1 className={style.title}>next app <span>hey</span></h1>
      </div>
    </>
  )
}
