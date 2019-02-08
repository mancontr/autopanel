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

  const prefix = autopanel.getSettings().prefix || ''
  const fullPath = window.location.pathname
  const extraPath = fullPath.substring(prefix.length + base.length)

  const entries = []

  let dashboardClass = 'entry'
  if (extraPath === '') dashboardClass += ' active'
  entries.push(
    <Link className={dashboardClass} to={base} key="dashboard">
      <span className="icon icon-gauge" />
      <FormattedMessage id="dashboard">
        {(txt) => <span className="label">{txt}</span>}
      </FormattedMessage>
    </Link>
  )

  if (schema) {
    let entitiesClass = 'entry'
    if (extraPath.startsWith('/entities')) entitiesClass += ' active'
    entries.push(
      <div className="menu-collapsable" key="entities">
        <Link className={entitiesClass} to={base + '/entities'}>
          <span className="icon icon-doc-text" />
          <FormattedMessage id="entities">
            {(txt) => <span className="label">{txt}</span>}
          </FormattedMessage>
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

  let settingsClass = 'entry'
  if (extraPath === '/settings') settingsClass += ' active'
  entries.push(
    <Link className={settingsClass} to={base + '/settings'}
      key="settings">
      <span className="icon icon-cog" />
      <FormattedMessage id="settings">
        {(txt) => <span className="label">{txt}</span>}
      </FormattedMessage>
    </Link>
  )

  return <aside id="project-sidebar">{entries}</aside>
}

Menu.propTypes = {
  projectId: PropTypes.string.isRequired
}

export default Menu
