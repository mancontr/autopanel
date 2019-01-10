import React, { Suspense } from 'react'
import PropTypes from 'prop-types'

import { useAutoPanel } from '../../api'
import Header from './Header'
import Login from './Login'
import './MainLayout.sass'

const ChildrenOrLogin = ({ children }) => {
  const autopanel = useAutoPanel()
  const user = autopanel.getUser()
  return <div id="content">{user ? children : <Login />}</div>
}

ChildrenOrLogin.propTypes = {
  children: PropTypes.any
}

export const MainLayout = ({ children }) => {
  return (
    <div id="main-layout">
      <Suspense fallback={'Loading...'}>
        <Header />
        <ChildrenOrLogin children={children} />
      </Suspense>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.any
}

export default MainLayout
