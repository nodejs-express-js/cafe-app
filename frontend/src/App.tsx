import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'

import styles from './App.module.css'

function App() {
  return (
    <>
      <div className={styles.app}>
        <Navbar />
        <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  )
}


export default App
