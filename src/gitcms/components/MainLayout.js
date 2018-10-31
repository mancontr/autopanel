import React from 'react'
import PropTypes from 'prop-types'
import ConfigProvider from 'src/gitcms/ConfigProvider'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import Header from './Header'
import Login from './Login'
import './MainLayout.sass'

export class MainLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object
  }

  render = () => __CLIENT__ && (
    <ConfigProvider>
      <Helmet>
        <title>GitCMS</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Helmet>
      <div id="main-layout">
        <Header />
        <div id="content">
          {this.props.user ? this.props.children : <Login />}
        </div>
      </div>
    </ConfigProvider>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.userinfo
})

const MainLayoutContainer = connect(mapStateToProps)(MainLayout)

export default MainLayoutContainer
