import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from '../styles/sidebar.module.css';
import { useRouter } from "next/router";


export default function Sidebar() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleOptionClick = (option) => {
    router.push(`/${option}`);
  };

  const toggleShow = () => {
    setShow(!show);
  }

  return (
    <div>
      <button onClick={toggleShow}>
        {show ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      <div className={`${styles.sidebar} ${show ? styles.show : ''}`}>
        <button onClick={toggleShow} className={styles.closeButton}>Close</button>
        <button onClick={() => handleOptionClick("dashboard")}>Protocol Manager</button>
        <button onClick={() => handleOptionClick("verify")}>Verify</button>
        <button onClick={() => handleOptionClick("userLoan")}>My Loan</button>
        <button onClick={() => handleOptionClick("borrower")}>Borrow Money</button>
        <button onClick={() => handleOptionClick("loan")}>Lend Money</button>
        <button onClick={() => handleOptionClick("staker")}>Become Staker </button>
      </div>
    </div>
  )
}
