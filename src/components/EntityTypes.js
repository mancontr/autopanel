import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { useGitcms } from '../api'
// import './Dashboard.sass'

const EntityTypes = ({ params }) => {
  const gitcms = useGitcms()
  const schema = gitcms.getSchema()
  const prefix = '/project/' + params.projectId + '/entities/'
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

EntityTypes.propTypes = {
  params: PropTypes.object.isRequired
}

export default EntityTypes
