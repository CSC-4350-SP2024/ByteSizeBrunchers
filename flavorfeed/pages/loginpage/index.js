import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Login | FlavorFeed</title>
        <meta name="description" content="Login to access your FlavorFeed account." />
      </Head>

      <main className="main">
        
        <h1 className="title">Login to FlavorFeed</h1>
        
        <form className="loginForm" action="/api/login" method="POST">
          <div className="inputGroup">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          
          <button type="submit" className="loginButton">Login</button>
          
          <div className="links">
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/register">Register Account</a>
          </div>
        </form>
        
      </main>
      
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f0f2f5;
        }
        .main {
          width: 100%;
          max-width: 400px;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .title {
          text-align: center;
          margin-bottom: 20px;
        }
        .loginForm {
          display: flex;
          flex-direction: column;
        }
        .inputGroup {
          margin-bottom: 15px;
        }
        .inputGroup label {
          margin-bottom: 5px;
        }
        .inputGroup input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .loginButton {
          background-color: #007bff;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .loginButton:hover {
          background-color: #0056b3;
        }
        .links {
          margin-top: 15px;
          text-align: center;
        }
        .links a {
          color: #007bff;
          text-decoration: none;
          margin: 0 5px;
        }
        .links a:hover {
          text-decoration: underline;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-image: url('/home/rohankatkar/ByteSizeBrunchers/flavorfeed/public/flavorfeedlogo.JPG'); 
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #f0f2f5; // Fallback color
        }

      `}</style>
    </div>
  )
}

