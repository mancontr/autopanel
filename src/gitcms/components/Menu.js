import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import './Menu.sass'

const Menu = ({ projectId, schema }) => {
  const base = '/project/' + projectId
  const entries = []

  entries.push(
    <IndexLink className="entry" activeClassName="active" to={base}
      key="dashboard">
      <span className="icon icon-gauge" />
      <FormattedMessage id="dashboard" />
    </IndexLink>
  )

  if (schema.isSuccess) {
    entries.push(
      <div className="menu-collapsable" key="entities">
        <Link className="entry" activeClassName="active" to={base + '/entities'}>
          <span className="icon icon-doc-text" />
          <FormattedMessage id="entities" />
        </Link>
        <div className="children">
          {schema.value.entities.map((entity) => (
            <Link className="entry subentry" activeClassName="active"
              key={entity.name} to={base + '/entities/' + entity.name}>
              {entity.label || entity.name}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  entries.push(
    <Link className="entry" activeClassName="active" to={base + '/settings'}
      key="settings">
      <span className="icon icon-cog" />
      <FormattedMessage id="settings" />
    </Link>
  )

  return <aside id="project-sidebar">{entries}</aside>
}

Menu.propTypes = {
  projectId: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {}
})

export default connect(mapStateToProps)(Menu)
