import dynamic from 'next/dynamic'; //debugging entry
import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import ChatContainer from './ChatContainer';

//dynamic import of Card component with SSR disabled
const CardWithNoSSR = dynamic(() => import('./Card'), { ssr: false }); 

export default function Home() {
  const [chatLogs, setChatLogs] = useState([]);

  useEffect(() => {
    fetch('/chat.json')
        .then(response => response.json())
        .then(setChatLogs);
    }, []);

  return (
    <div className={styles.container}>

      <div id="card" style={{position: 'absolute', top: '25%', left: '35%', transform: 'translate(-50%, -50%)', height: '80vh', width: '50vw'}}>
        {/* <Card /> Commented out for debugging */}
        <CardWithNoSSR />
      </div>

      <ChatContainer chatLogs={chatLogs} setChatLogs={setChatLogs} />
    </div>
  );
}