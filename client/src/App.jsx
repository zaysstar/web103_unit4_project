import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewKeyboards from './pages/ViewKeyboards'
import EditKeyboard from './pages/EditKeyboard'
import CreateKeyboard from './pages/CreateKeyboard'
import KeyboardDetails from './pages/KeyboardDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateKeyboard title='CLICK & CLACK | Customize' />
    },
    {
      path:'/customkeyboards',
      element: <ViewKeyboards title='CLICK & CLACK | Custom Keyboards' />
    },
    {
      path: '/customkeyboards/:id',
      element: <KeyboardDetails title='CLICK & CLACK | View' />
    },
    {
      path: '/edit/:id',
      element: <EditKeyboard title='CLICK & CLACK | Edit' />
    }
  ])

  return (
    <div className='app'>
      <Navigation />
      { element }
    </div>
  )
}

export default App