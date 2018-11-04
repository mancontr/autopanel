import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
// import './Dashboard.sass'

export class Entities extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired
  }

  renderEntityList = () => {
    if (this.props.schema.isLoading) {
      return <FormattedMessage id="loading" />
    }
    if (this.props.schema.isError) {
      return <FormattedMessage id="entities.error" />
    }
    if (this.props.schema.isSuccess) {
      const schema = this.props.schema.value
      return (
        <ul className="entities">
          {schema.entities.map((entity) => (
            <li className="entity" key={entity.name}>
              {entity.label || entity.name}
            </li>
          ))}
        </ul>
      )
    }
  }

  render = () => (
    <div id="entities">
      <h1><FormattedMessage id="entities" /></h1>
      <div className="box">
        {this.renderEntityList()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {}
})
export default connect(mapStateToProps)(Entities)
