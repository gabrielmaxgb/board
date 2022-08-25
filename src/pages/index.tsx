import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/styles.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando tarefas</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="/images/board-user.svg" alt="board-user" />
        <section className={styles.callToAction}>
          <h1>Board - Organizando tarefas</h1>
          <p>
            <span>100% gratuito</span>
            e online.
          </p>
        </section>
        <div className={styles.donaters}>
          <img src="https://sujeitoprogramador.com/steve.png" alt="user" />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {

    },
    revalidate: 60 * 60, // update in 60 min
  };
};
