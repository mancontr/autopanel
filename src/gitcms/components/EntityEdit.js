import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import Config from 'src/gitcms/Config'
import {
  getEntity, createEntity, saveEntity, removeEntity
} from 'src/store/actions/gitcms'
import './EntityEdit.sass'

export class EntityEdit extends React.Component {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    getEntity: PropTypes.func.isRequired,
    createEntity: PropTypes.func.isRequired,
    saveEntity: PropTypes.func.isRequired,
    removeEntity: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    if (this.props.schema.isSuccess) {
      const id = this.props.params.entityId
      if (!id) {
        this.setState({ entity: {
          isSuccess: true,
          value: {}
        } })
        return
      }
      this.props.getEntity(this.props.params.entityType, id)
        .then((res) => this.setState({ entity: res.payload }))
    }
  }

  renderFields = (entityType) =>
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
          <Editor field={f}
            value={this.state.entity[f.name]}
            onChange={this.handleChange(f.name)} />
        </div>
      )
    })

  handleChange = (field) => (value) => {
    this.setState({
      entity: { ...this.state.entity, [field]: value },
      modified: true
    })
  }

  handleSave = () => {
    const { entityId, entityType, projectId } = this.props.params
    const isNew = entityId === undefined
    if (isNew) {
      this.props.createEntity(entityType, this.state.entity)
        .then((action) => {
          const id = action.payload.id
          this.props.router.push(
            '/project/' + projectId + '/entities/' + entityType + '/' + id
          )
        })
    } else {
      this.props.saveEntity(entityType, entityId, this.state.entity)
        .then(() => this.setState({ modified: false }))
    }
  }

  handleRemove = () => {
    const { entityId, entityType, projectId } = this.props.params
    this.props.removeEntity(entityType, entityId)
      .then(() => this.props.router.push(
        '/project/' + projectId + '/entities/' + entityType
      ))
  }

  render = () => {
    const id = this.props.params.entityId
    const isNew = id === undefined

    if (!isNew) {
      if (this.props.entity.isLoading) {
        return <FormattedMessage id="loading" />
      }
      if (this.props.entity.isError) {
        return <FormattedMessage id="entities.error" />
      }
      if (!this.props.entity.isSuccess) {
        return false
      }
    }

    const entityType = this.props.schema.value.entities
      .find((e) => e.name === this.props.params.entityType)
    if (!entityType) {
      return <FormattedMessage id="entities.unknown" />
    }

    const entity = this.state && this.state.entity
    if (!entity) return false

    const titleValues = {
      type: entityType.label || entityType.name,
      id: id
    }

    return (
      <div id="entity-edit">

        <h1>
          <FormattedMessage id={'entities.title.' + (isNew ? 'create' : 'edit')}
            values={titleValues} />
        </h1>
        {this.renderFields(entityType)}
        <button className="save button" type="button" onClick={this.handleSave}
          disabled={!this.state.modified}>
          <FormattedMessage id={this.state.modified ? 'save' : 'saved'} />
        </button>
        {!isNew && (
          <span className="remove" onClick={this.handleRemove}>
            <FormattedMessage id="remove" />
          </span>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  schema: state.projects.currentSchema || {},
  entity: state.projects.currentEntity || {}
})
export default connect(mapStateToProps, {
  getEntity, createEntity, saveEntity, removeEntity
})(EntityEdit)
