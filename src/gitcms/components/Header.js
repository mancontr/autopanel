import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from 'src/store/actions/user'

import './Header.sass'

const Header = ({ user, logout }) => {
  let userBlock = false
  if (user) {
    const style = {}
    if (user.avatar) {
      style.backgroundImage = 'url("' + user.avatar + '")'
    }
    userBlock = (
      <div className="user">
        <div className="avatar" style={style} />
        <div className="name">{user.name}</div>
        <div className="dropdown">
          <div className="logout" onClick={logout}>
            <FormattedMessage id="logout" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <header id="top-header">
      <Link className="home" to="/">
        <span className="logo icon icon-gitcms" />
        GitCMS
      </Link>
      {userBlock}
    </header>
  )
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user.userinfo
})

const HeaderContainer = connect(mapStateToProps, { logout })(Header)

export default HeaderContainer
