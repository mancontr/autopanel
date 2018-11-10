import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import Config from 'src/gitcms/Config'
import { getEntityList } from 'src/store/actions/gitcms'
import './EntityEdit.sass'

export class EntityList extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    entities: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    getEntityList: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    if (this.props.schema.isSuccess) {
      this.props.getEntityList(this.props.params.entityType)
    }
  }

  renderFields = (entityType, entity) =>
    entityType.fields.map((f) => {
      const type = Config.getType(f.type)
      if (!type) return false
      const Editor = type.edit
      return (
        <div className="box field" key={f.name}>
          <div className="label">{f.label || f.name}</div>
          {f.description && (
            <div className="description">{f.description}</div>
          )}
          <Editor field={f} value={entity[f.name]} />
        </div>
      )
    })

  render = () => {
    if (this.props.entities.isLoading) {
      return <FormattedMessage id="loading" />
    }
    if (this.props.entities.isError) {
      return <FormattedMessage id="entities.error" />
    }
    if (!this.props.entities.isSuccess) {
      return false
    }

    const entityType = this.props.schema.value.entities
      .find((e) => e.name === this.props.params.entityType)
    if (!entityType) {
      return <FormattedMessage id="entities.unknown" />
    }

    const id = this.props.params.entityId
    const entity = this.props.entities.value[id - 1]

    return (
      <div id="entity-edit">
        <h1>{entityType.label || entityType.name} #{id}</h1>
        {this.renderFields(entityType, entity)}
        <button className="save button" type="button">
          <FormattedMessage id="save" />
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {},
  entities: state.projects.currentEntities || {}
})
export default connect(mapStateToProps, { getEntityList })(EntityList)
