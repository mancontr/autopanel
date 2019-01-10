import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from './Link'
import { useAutoPanel } from '../api'

const EntityTypes = () => {
  const autopanel = useAutoPanel()
  const schema = autopanel.getSchema()
  const projectId = autopanel.getProjectId()
  const prefix = '/project/' + projectId + '/entities/'
  return (
    <div id="entities">
      <h1><FormattedMessage id="entities" /></h1>
      <div className="box withTable">
        <table className="entities">
          <thead>
            <tr>
              <th><FormattedMessage id="entities.entity" /></th>
              <th><FormattedMessage id="entities.description" /></th>
            </tr>
          </thead>
          <tbody>
            {schema.entities.map((entity) => (
              <tr className="entity" key={entity.name}>
                <td>
                  <Link to={prefix + entity.name}>
                    {entity.label || entity.name}
                  </Link>
                </td>
                <td>
                  {entity.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EntityTypes
