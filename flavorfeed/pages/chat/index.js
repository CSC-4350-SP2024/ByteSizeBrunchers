import Head from 'next/head';
import mainpage from '../index.js';
/*import dynamic from 'next/dynamic'; //debugging entry */
import styles from './chatpage.module.css';
import { useEffect, useState } from 'react';

export default function Home() {

	const [messages, setMessages] = useState([]);
	/*const server_url = 'http://127.0.0.1:3100/query';*/
	/*const server_url = 'http://127.0.0.1:3000/query'; // original url*/
	const server_url = 'http://127.0.0.1:3100/query';

	async function ff_userinput(userinput) {
		// Add user message to the chat window
		setMessages([...messages, { text: userinput, from: 'user' }]);
		console.log(userinput);
		
		try {
			// Make API call to LLM API using fetch
			const response = await fetch(server_url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userID: 'e6328e4a-4477-4273-b299-8630ee657439',
					query: userinput
				})
			});
			//console.log(response);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			/* get llm response and add to list */
			const llm_response = await response.json();
			console.log(llm_response);
    	setMessages([...messages, {text: userinput, from:'user'},{ text: llm_response.response, from: 'bot' }]);
		} catch (error) {
			console.error('Error fetching response from backend API:', error);
		}
	}

	return (
<div className={styles.container}>
	<title>Flavor Feed Chatbot</title>	

	<div className={styles.title}>
		Flavor Feed
	</div>	
	<div className={styles.chatboxcontainer}>
		<div className={styles.chatleft} />
		<div className={styles.chatbox}>	
			<ul className={styles.chatbot}>
				<div height="500px"> 
					<center> <img src="../ff_logo.jpg"/> </center>
				</div>
				<li className= {styles.outgoing}>
					<span> <img src="../ff_logo.jpg" height="40px"/> </span>
					<p> Hello! What recipe can I help you find today? </p>
				</li>

				{messages.map((message, index) => (
					<li key={index} className={message.from === 'user' ? styles.incoming : styles.outgoing}>
					{message.from === 'user' ? "" : (<span> <img src="../ff_logo.jpg" height="40px"/> </span>)}
					<p>{message.text}</p>
				</li>))}
				
			</ul>
			<div className= {styles.chatbottom}>
				<div className={styles.input}>
					<input placeholder="Start looking for recipes... Press enter to submit" onKeyDown={(e) => e.key === 'Enter' && ff_userinput(e.target.value)} />
				</div>
			</div>
		</div>
		<div className={styles.chatright} />
	</div>


	<footer className={styles.footer}>
		<a href="https://github.com/CSC-4350-SP2024/ByteSizeBrunchers" target="_blank" rel="noopener noreferrer">Made by ByteSizedBrunchers</a>
	</footer>









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



	
