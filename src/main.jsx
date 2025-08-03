import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'
import Home from './Routes/Home.jsx'
import Layout from './Routes/Layout.jsx'
import Login from './Routes/Login.jsx'
import NotFound from './Components/NotFound.jsx'
import Add from './Routes/Add.jsx'
import PostDetails from './Routes/DetailsPage.jsx'
import Edit from './Routes/Edit.jsx'


createRoot(document.getElementById('root')).render(
  // TODO - move all the theme and set theme to this file and pass both as props to every route
  //TODO - try to do the same witn the session thing too if possible
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<App/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/home" element={<Layout />} >
            <Route index element={<Home/>}/>
            <Route path='/home/add-post' element={<Add/>}/>
            <Route path='/home/:id' element={<PostDetails/>}/>
            <Route path='/home/edit/:id' element={<Edit/>}/>
          </Route>
          <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
