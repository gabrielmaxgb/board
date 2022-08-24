import React from 'react'
import styles from "./signInButtonStyles.module.scss";
import { FaGithub, FaUserNinja } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Image from 'next/image';

function SignInButton() {
  // component state careless
  const session = true;

  const loggedOutButton = () => {
    return (
      <button
      type="button"
      className={styles.signInButton}
      onClick={() => {}}
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
      onClick={() => {}}
    >
      <FaUserNinja color="#FFB800" />
      Olá, Gabriel
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
    );
  };

  return session ? loggedButton() : loggedOutButton(); 
}

export default SignInButton;