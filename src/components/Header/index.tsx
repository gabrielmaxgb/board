import styles from "./headerStyles.module.scss";
import Image from "next/image";
import logoImage from "../../../images/logo.svg";
import Link from "next/link";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image src={logoImage} alt="logo-meu-board" />
        </Link>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/board">
            <a>Meu board</a>
          </Link>
        </nav>
        <button>Entrar com github</button>
      </div>
    </header>
  )
}

export default Header;