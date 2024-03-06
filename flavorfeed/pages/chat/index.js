import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Card from './Card';
import ChatContainer from './ChatContainer';

export default function Home() {
  const [chatLogs, setChatLogs] = useState([]);

  useEffect(() => {
    fetch('/chat.json')
        .then(response => response.json())
        .then(setChatLogs);
    }, []);

  return (
    <div className={styles.container}>

      <div id="card" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '80vh', width: '50vw'}}>
        <Card />
      </div>

      <ChatContainer chatLogs={chatLogs} setChatLogs={setChatLogs} />
    </div>
  );
}