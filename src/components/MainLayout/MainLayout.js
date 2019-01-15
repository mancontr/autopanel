import React, { Suspense } from 'react'
import PropTypes from 'prop-types'

import { useAutoPanel } from '../../api'
import Header from './Header'
import Login from './Login'
import './MainLayout.sass'

const ChildrenOrLogin = ({ children, login }) => {
  const autopanel = useAutoPanel()
  const user = autopanel.getUser()
  const LoginComponent = login || Login
  return <div id="content">{user ? children : <LoginComponent />}</div>
}

ChildrenOrLogin.propTypes = {
  children: PropTypes.any,
  login: PropTypes.element
}

export const MainLayout = ({ children, login }) => {
  return (
    <div id="main-layout">
      <Suspense fallback={'Loading...'}>
        <Header />
        <ChildrenOrLogin children={children} login={login} />
      </Suspense>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.any,
  login: PropTypes.element
}

export default MainLayout
