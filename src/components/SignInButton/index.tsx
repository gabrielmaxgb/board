import { signIn, signOut, useSession } from "next-auth/react";

import styles from "./signInButtonStyles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Image from 'next/image';

function SignInButton() {
  const session = useSession();
  console.log(session);

  const loggedOutButton = () => {
    return (
      <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#FFB800" />
      Entrar com Github
    </button>
    );
  };

  const loggedButton = () => {
    return (
      <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      {/* <FaUserNinja color="#FFB800" /> */}
      <img src={session.data.user.image} alt='user-image' />
      Olá, {session?.data?.user?.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
    );
  };

  return session.data ? loggedButton() : loggedOutButton(); 
}

export default SignInButton;