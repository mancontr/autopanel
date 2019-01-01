import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import { useGitcms } from 'src/gitcms'
import Header from './Header'
import Login from './Login'
import './MainLayout.sass'

const ChildrenOrLogin = ({ children }) => {
  const gitcms = useGitcms()
  const user = gitcms.getUser()
  return <div id="content">{user ? children : <Login />}</div>
}

ChildrenOrLogin.propTypes = {
  children: PropTypes.element
}

export const MainLayout = ({ children }) => {
  return (
    <div id="main-layout">
      <Helmet>
        <title>GitCMS</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Helmet>
      <Suspense fallback={'Loading...'}>
        <Header />
        <ChildrenOrLogin children={children} />
      </Suspense>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.element
}

const _export = __CLIENT__ ? MainLayout : false
export default _export // MainLayout
