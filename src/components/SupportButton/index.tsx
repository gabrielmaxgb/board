import Link from 'next/link';
import React from 'react'
import styles from "./supportButtonStyles.module.scss";

export default function SupportButton() {
  return (
    <div className={styles.donateContainer}>
      <Link href="/donate">
        <button>
          Apoiar
        </button>
      </Link>
    </div>
  )
}
