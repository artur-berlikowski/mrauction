import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
//Pages
import Home from './pages/Home'
import Auctions from './pages/Auctions'
import Watching from './pages/Watching'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="auctions" element={<Auctions />}></Route>
          <Route path="watching" element={<Watching />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
