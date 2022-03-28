import Link from "next/link";
import Image from 'next/image'
import styles from '../styles/Layout.module.css'

function Footer() {
  // const [{ data }] = useGetCurrentUserQuery();
  // const isAuthenticated = !!data?.currentUser;

  return (
    <footer className={styles.footer}>
        © {new Date().getFullYear()}, Built with &hearts; by &nbsp; 
        <a
          href="https://blakemoore.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
        Blake Moore
        </a> &nbsp; for 
        <span className={styles.logo}>
          <a
            href="https://wefunder.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/wefunder-logo.svg" alt="WePitcher Logo" width={72} height={16} />
          </a>
        </span>
      </footer>
  );
}

export default Footer;


