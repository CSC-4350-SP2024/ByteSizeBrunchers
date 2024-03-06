import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [chatLogs, setChatLogs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/chat.json')
        .then(response => response.json())
        .then(data => setChatLogs(data));
    }, []);

    const sendMessage = () => {
        fetch('/api/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'user', message }),
        })
        .then(response => response.json())
        .then(data => {
            setChatLogs([...chatLogs, data]);
            setMessage('');
        });
    };

  return (
    <div className={styles.container}>
      <Head>
        <title>Flavor Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Flavor Feed
        </h1>

        <div id="chat-container">
          {chatLogs.map((log, index) => (
            <div key={index} className={log.username === 'user' ? 'user-message' : 'system-message'}>
              <p>{log.message}</p>
            </div>
          ))}
        </div>

        <div id="message-input">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </main>

      <style jsx>{`
        main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #chat-container {
            width: 300px;
            height: 500px;
            border: 1px solid black;
            padding: 10px;
            overflow-y: auto;
            margin-top: 2rem;
        }
        .user-message {
            text-align: left;
            color: blue;
        }
        .system-message {
            text-align: right;
            color: red;
        }
        #message-input {
            position: fixed;
            bottom: 0;
            width: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
        }
        #message-input input {
            margin-right: 1rem;
            width: 70%;
        }
        #message-input button {
            width: 30%;
        }
        
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
