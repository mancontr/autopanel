import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import ErrorBoundary from 'src/gitcms/components/ErrorBoundary'
import Header from './Header'
import Login from './Login'
import './MainLayout.sass'

export class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object
  }

  render = () => __CLIENT__ && (
    <React.Fragment>
      <Helmet>
        <title>GitCMS</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Helmet>
      <div id="main-layout">
        <ErrorBoundary>
          <Header />
          <div id="content">
            {this.props.user ? this.props.children : <Login />}
          </div>
        </ErrorBoundary>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.userinfo
})

const MainLayoutContainer = connect(mapStateToProps)(MainLayout)

export default MainLayoutContainer
