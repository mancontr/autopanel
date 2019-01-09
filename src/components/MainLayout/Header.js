import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { useAutoPanel } from '../../api'

import './Header.sass'

const Header = () => {
  const autopanel = useAutoPanel()
  const user = autopanel.getUser()
  const logout = autopanel.logout

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
        <span className="logo icon icon-autopanel" />
        AutoPanel
      </Link>
      {userBlock}
    </header>
  )
}

export default Header
