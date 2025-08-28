import React from 'react'
import {BrowserRouter as Router, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router'
import Navbar from './components/Navbar'

// layouts
import RootLayout from './layout/RootLayout'

// pages
import Home from './pages/Home'
import Books from './pages/Books'
import Cart from './pages/Cart'
import BookDetails from './pages/BookDetails'
import Error from './pages/Error'
import Announcement from './pages/Announcement'
import Profile from './pages/Profile'


const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      errorElement: <Error/>,
      children: [
        {
          index: true,
          element: <Home/>
        },
        {
          path: '/books',
          element: <Books/>
        },
        {
          path: '/announcement',
          element: <Announcement/>
        },
        {
          path: '/cart',
          element: <Cart/>
        },
        {
          path: '/profile',
          element: <Profile/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={routes}/>
  )
}

export default App