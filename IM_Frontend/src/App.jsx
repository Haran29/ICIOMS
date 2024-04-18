import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import MyFooter from './components/MyFooter'


function App() {


  return (
    <>
      <NavBar/>
      <div className='min-h-screen'>
        <Outlet>

        </Outlet>
      </div>
      <MyFooter/>
    </>
  )
}

export default App
