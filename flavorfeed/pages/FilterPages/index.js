import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>
          Looking for anything specfic today?
        </h1>

	<h2>Use these filters to find exactly what you are looking for!</h2>
	<div class="filterbox">
	<input type="search" placeholder="Filter away..." name="Filter 2"/>
	</div>

	<label for = "Cuisines">What cuisines are you in the mood for today?</label>
	<select name = "Cuisines" id = "Cuisines"></select>
	<option value = "American">American</option> 
	<option value = "Indian">Indian</option> 
	<option value = "French">French</option> 
	<option value = "Italian">Italian</option> 
	<option value = "Korean">Korean</option> 
	<option value = "Mexican">Mexican</option> 
	<option value = "Japanese">Japanese</option> 
 	

      </main>

      <footer>
        <a
          href="https://github.com/CSC-4350-SP2024/ByteSizeBrunchers"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by ByteSizedBrunchers
	  Last Updated on 3/7 5:10 am
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 10;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

	search {
          width: 1000px;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
	}
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
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

