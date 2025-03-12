import React from 'react'
import "./index.css"
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
)

export default App;
