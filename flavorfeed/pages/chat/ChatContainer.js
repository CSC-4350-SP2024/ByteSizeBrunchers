import { useState } from 'react';

export default function ChatContainer({ chatLogs, setChatLogs }) {
  const [message, setMessage] = useState('');

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
    <div id="chat-container" style={{position: 'fixed', bottom: '0', right: '0', width: '30vw', height: '30vh', zIndex: 1000}}>
      {chatLogs.map((log, index) => (
        <div key={index} style={{textAlign: log.username === 'user' ? 'right' : 'left'}}>
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
  );
}