import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import firebaseConnection from '../../services/firebaseConnection';

const db = getFirestore(firebaseConnection);

function Task() {
  const router = useRouter();
  const { taskId } = router.query;
  console.log("id")
  console.log(taskId)
  return (
    <div>task details {taskId}</div>
  )
}

export default Task;

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({req});
  const { taskId } = params;

  // const q = query(collection(db, "tasks", `${taskId}`));
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  if(!session?.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  console.log("params");
  console.log(params);

  return {
    props: {

    },
  };
};