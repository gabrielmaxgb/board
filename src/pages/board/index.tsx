import Head from "next/head";
import styles from "./boardStyles.module.scss";
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from "react-icons/fi";
import SupportButton from "../../components/SupportButton";

function Board() {
  return (
    <>
      <Head>
        <title>Minhas tarefas | Board</title>
      </Head>
      <main className={styles.container}>
        <form action="">
          <input type="text" placeholder="Digite sua tarefa" />
          <button type="submit" onClick={(e) => {e.preventDefault()}}>
            <FiPlus size={25} color="#17181F" />
          </button>
        </form>
        <h1>Você tem 2 tarefas!</h1>
        <section>
          <article className={styles.taskList}>
            <p>task description</p>

            <div className={styles.actions}>
              <div>
                <FiCalendar size={20} color="#FFB800" />
                <time>17 Julho 2021</time>
                <button>
                  <FiEdit2 size={20} color="#FFFFFF" />
                  <span>Editar</span>
                </button>
              </div>
              <button>
                <span>
                  <FiTrash size={20} color="#FE3636" />
                  Excluir
                </span>
              </button>
            </div>
          </article>
        </section>
      </main>
      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar este projeto!</h3>
        <div>
          <FiClock size={20} color="#FFFFFF" />
          <time>
            Última doação há 3 dias.
          </time>
        </div>
      </div>
      <SupportButton />
    </>
  )
}

export default Board