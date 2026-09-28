import { useState } from 'react'
import './App.css'
import github from "./assets/github4.png"
function App() {
  const [userName, setUserName] = useState("")
  const [githubData, setGithubData] = useState({})

  const SearchHandler = async () => {
    console.log("userName", userName);
    const data = await fetch(`https://api.github.com/users/${userName}`)
    .then(res => res.json())
    setGithubData(data)
  }

  return (
    <div className='body'>
      <img src={github} alt="git logo" />
      <h1>Open  <span className='span'>GitHub</span> Profile</h1>
      <p>Enter a GitHub username and you'll be redirected <br />  to their public profile</p>
      <div className='main'>
        <input type="text" name="username" id="username" placeholder='Enter GitHub username...' 
        value={userName} onChange={(e) => setUserName(e.target.value)} /> <br /> <br />
        <button onClick={() => SearchHandler()}>Open Profile</button>
      </div>
      <p>ⓘ This will only open the profile in this tab</p>
      <div className='listing'>

        <img src={githubData.avatar_url} alt="" width={300} height={300} />
        <h1> {githubData.name} </h1>
        <p>{githubData.bio}</p>
      </div>
    </div>
  )
}

export default App
