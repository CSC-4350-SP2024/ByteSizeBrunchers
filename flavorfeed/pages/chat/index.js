import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Card from './card';

export default function Home() {
  const [chatLogs, setChatLogs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/chat.json')
        .then(response => response.json())
        .then(setChatLogs);
    }, []);

  const sendMessage = async () => {
    const response = await fetch('/api/send_message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'user', message }),
    });

    const data = await response.json();
    setChatLogs([...chatLogs, data]);
    setMessage('');
  };

  return (
    <div className={styles.container}>

      <div id="card" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '80vh', width: '50vw'}}>
        <Card />
      </div>

      <div id="chat-container" style={{position: 'fixed', bottom: '0', right: '0'}}>
        {chatLogs.map((log, index) => (
          <div key={index} className={log.username === 'user' ? 'user-message' : 'system-message'}>
            <p>{log.message}</p>
          </div>
        ))}

        <div id="message-input">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}