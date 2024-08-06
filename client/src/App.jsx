import { useEffect, useState } from 'react';
import './App.css';
import initializeSocket from './socket';
// eslint-disable-next-line no-unused-vars
import { Socket } from 'socket.io-client';

function App() {
  /**
   * @type {[Socket, React.Dispatch<React.SetStateAction<Socket>>]}
   */
  const [socket, setSocket] = useState(null);
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [friendMessage, setFriendMessage] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.log('Connected');
      });

      socket.on('receiveMessage', (data) => {
        setFriendMessage((prev) => {
          const copyPrev = [...prev];

          copyPrev.push(data);

          return copyPrev;
        });
      });
    }

    return () => {
      if (socket) {
        socket.off('receiveMessage');
      }
    };
  }, [socket]);

  const handleConnectSocket = () => {
    if (userName) {
      const socket = initializeSocket(userName);
      setSocket(socket);
    }
  };

  const handleSendMessage = () => {
    if (message && socket) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <>
      <h1>Socket Demo</h1>

      <div
        style={{
          width: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <input
          type="text"
          value={userName}
          placeholder="User Name"
          style={{ height: 30, width: 280 }}
          onChange={(event) => setUserName(event.target.value)}
        />

        {!socket && (
          <button style={{ width: 105 }} onClick={handleConnectSocket}>
            Connect
          </button>
        )}
      </div>

      <div
        style={{
          width: 400,
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <input
          type="text"
          value={message}
          placeholder="Enter Message"
          style={{ height: 30, width: 280 }}
          onChange={(event) => setMessage(event.target.value)}
        />

        <button style={{ width: 105 }} onClick={handleSendMessage}>
          Send
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        {friendMessage.map((value, index) => (
          <div style={{ marginTop: 5 }} key={index}>
            {value}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
