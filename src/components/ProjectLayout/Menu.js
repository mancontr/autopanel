import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from '../Link'
import { useAutoPanel } from '../../api'
import './Menu.sass'

const Menu = ({ projectId }) => {
  const base = '/project/' + projectId
  const autopanel = useAutoPanel()
  const schema = autopanel.optional(() => autopanel.getSchema())

  const entries = []
  entries.push(
    <Link className="entry" to={base} key="dashboard">
      <span className="icon icon-gauge" />
      <FormattedMessage id="dashboard" />
    </Link>
  )

  if (schema) {
    entries.push(
      <div className="menu-collapsable" key="entities">
        <Link className="entry" to={base + '/entities'}>
          <span className="icon icon-doc-text" />
          <FormattedMessage id="entities" />
        </Link>
        <div className="children">
          {schema.entities.map((entity) => (
            <Link className="entry subentry" key={entity.name}
              to={base + '/entities/' + entity.name}>
              {entity.label || entity.name}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  entries.push(
    <Link className="entry" to={base + '/settings'}
      key="settings">
      <span className="icon icon-cog" />
      <FormattedMessage id="settings" />
    </Link>
  )

  return <aside id="project-sidebar">{entries}</aside>
}

Menu.propTypes = {
  projectId: PropTypes.string.isRequired
}

export default Menu
