import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { IndexLink, Link } from 'react-router'
import './Menu.sass'

const Menu = ({ projectId }) => {
  const base = '/project/' + projectId
  return (
    <aside id="project-sidebar">
      <IndexLink className="entry" activeClassName="active" to={base}>
        <span className="icon icon-gauge" />
        <FormattedMessage id="dashboard" />
      </IndexLink>
      <Link className="entry" activeClassName="active" to={base + '/entities'}>
        <span className="icon icon-doc-text" />
        <FormattedMessage id="entities" />
      </Link>
      <Link className="entry" activeClassName="active" to={base + '/settings'}>
        <span className="icon icon-cog" />
        <FormattedMessage id="settings" />
      </Link>
    </aside>
  )
}

Menu.propTypes = {
  projectId: PropTypes.string.isRequired
}

export default Menu
