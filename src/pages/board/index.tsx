import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import { getFirestore, addDoc, collection, getDocs, query, where, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

import styles from "./boardStyles.module.scss";
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock, FiX } from "react-icons/fi";
import SupportButton from "../../components/SupportButton";
import { FormEvent, useEffect, useState } from "react";
import firebaseConnection from "../../services/firebaseConnection";
import { format } from "date-fns";

type TtaskList = {
  id?: string,
  created: string | Date,
  createdFormated?: string,
  task: string,
  userId: string,
  author: string,
};

interface IBoardProps {
  user: {
    name: string,
    id: string,
  },
  taskListArray: string,
};

const db = getFirestore(firebaseConnection);

export default function Board(props: IBoardProps) {
  console.log("board props");
  console.log(props);
  const { user } = props;
  const [input, setInput] = useState('');
  // const inputRef = useRef(null);
  const [taskList, setTaskList] = useState<TtaskList[]>([]);
  const [editingTask, setEditingTask] = useState<TtaskList | null>(null);

  console.log("taskList")
  console.log(taskList)

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("userId", "==", user.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksList = [];
      querySnapshot.forEach((doc) => {
          const task = {
            id: doc.id,
            ...doc.data(),
          };
          tasksList.push(task);
      });
      console.log("Current user tasks: ", tasksList);
      setTaskList(tasksList);
    });

    return unsubscribe;
  }, []);

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    const newTask = {
      created: new Date(),
      createdFormated: format(new Date(), 'dd MMMM yyyy'),
      task: input,
      userId: user.id || null,
      author: user.name || null,
    };

    if (input === '') {
      alert('Preencha alguma tarefa!');
      return;
    }

    if (editingTask) {
      await updateDoc(doc(db, "tasks", editingTask.id), {
        task: input,
      })
      setInput('');
      setEditingTask(null);
      return;
    };

    try {
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      setInput('');
      console.log("Document written with ID", docRef.id);
    } catch (error) {
      console.log("Error adding document", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    alert("Aperte ok para confirmar!");
    await deleteDoc(doc(db, "tasks", `${taskId}`));
  };

  const handleEditTask = (task: TtaskList) => {
    console.log(task);
    setEditingTask(task);
    setInput(task.task);
  };

  const handleCancelEditing = () => {
    setInput('');
    setEditingTask(null);
  };

  const renderTasks = () => {
    return taskList.map((task, index) => {
      return (
        <article key={index} className={styles.taskList}>
          <p>{task.task}</p>
          <div className={styles.actions}>
            <div>
              <FiCalendar size={20} color="#FFB800" />
              <time>{task.createdFormated}</time>
              <button onClick={() => handleEditTask(task)}>
                <FiEdit2 size={20} color="#FFFFFF" />
                <span>Editar</span>
              </button>
            </div>
            <button onClick={() => handleDeleteTask(task?.id)}>
              <span>
                <FiTrash size={20} color="#FE3636" />
                Excluir
              </span>
            </button>
          </div>
        </article>
      );
    })
  };

  return (
    <>
      <Head>
        <title>Minhas tarefas | Board</title>
      </Head>
      <main className={styles.container}>
        {editingTask && (
          <span className={styles.warnText}>
            Editando tarefa:
            <button onClick={() => handleCancelEditing()}>
              Cancelar edição
              <FiX size={30} color="#FF3636" />
            </button>
          </span>
        )}
        <form action="" onSubmit={(e) => handleAddTask(e)}>
          <input 
            type="text" 
            placeholder="Digite sua tarefa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FiPlus size={25} color="#17181F" />
          </button>
        </form>
        <h1>Você tem {taskList.length} {taskList.length === 1 ? "tarefa" : "tarefas"}!</h1>
        <section>
          {renderTasks()}
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = {
    name: session?.user?.name,
    id: session?.id,
  };

  if (!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

  const taskListArray = [];
  const q = query(collection(db, "tasks"), where("userId", "==", user.id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const taskData = {
      id: doc.id,
      ...doc.data(),
    };
    taskListArray.push(taskData);
  }); 

  return {
    props: {
      user,
      // taskListArray: JSON.stringify(taskListArray),
    }
  };
};
