import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./signInButtonStyles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Image from 'next/image';

function SignInButton() {
  const { data: userSessionData, status } = useSession();
  
  // console.log("session");
  // console.log(userSessionData);

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
      {/* <img src={userSessionData.user.image} alt='user-image' /> */}

      <img src={userSessionData.user.image} alt='user-image' />
      Olá, {userSessionData.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
    );
  };

  return userSessionData ? loggedButton() : loggedOutButton(); 
}

export default SignInButton;