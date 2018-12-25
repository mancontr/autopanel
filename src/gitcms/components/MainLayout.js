import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import ErrorBoundary from 'src/gitcms/components/ErrorBoundary'
import Header from './Header'
import Login from './Login'
import './MainLayout.sass'

export const MainLayout = ({ user, children }) => {
  return __CLIENT__ &&
    <div id="main-layout">
      <Helmet>
        <title>GitCMS</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Helmet>
      <ErrorBoundary>
        <Header />
        <div id="content">
          {user ? children : <Login />}
        </div>
      </ErrorBoundary>
    </div>
}

MainLayout.propTypes = {
  children: PropTypes.element,
  user: PropTypes.object
}

const mapStateToProps = (state) => ({
  user: state.user.userinfo
})

const MainLayoutContainer = connect(mapStateToProps)(MainLayout)

export default MainLayoutContainer
