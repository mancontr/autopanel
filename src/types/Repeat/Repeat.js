import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { EditField } from '../../components/EntityEdit'
import Config from '../../Config'
import './Repeat.sass'

const RepeatEditor = ({ field, value, onChange }) => {
  value = value || []
  const handleAdd = () => onChange([ ...value, undefined ])
  return (
    <div className="repeat-entry-list">
      {value.map((currentValue, i) => {
        const subfield = { ...field.content, name: field.name + '[' + i + ']' }
        const handleChange = v => {
          value[i] = v
          onChange(value)
        }
        const handleRemove = () => {
          value.splice(i, 1)
          onChange(value)
        }
        return (
          <div className="repeat-entry" key={i}>
            <div className="cell left">{i + 1}</div>
            <EditField field={subfield} value={currentValue}
              onChange={handleChange} onRemove={handleRemove} />
            <div className="cell right" />
          </div>
        )
      })}
      <button className="add button" onClick={handleAdd}>
        <FormattedMessage id="add-new" />
      </button>
    </div>
  )
}

const preSave = ({ field, value, entity, attachments }) => {
  if (!value) return

  value.forEach((childValue, i) => {
    const childFieldType = Config.getType(field.content.type)
    const name = field.name + '[' + i + ']'
    const subEntity = { [name]: childValue }
    childFieldType && childFieldType.preSave && childFieldType.preSave({
      field: { ...field.content, name },
      value: childValue,
      entity: subEntity,
      attachments
    })
    value[i] = subEntity[name]
  })

  entity[field.name] = value
}

RepeatEditor.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired
}

const RepeatViewer = () => <span>...</span>

export default {
  name: 'repeat',
  view: RepeatViewer,
  edit: RepeatEditor,
  preSave,
  collapsible: true
}
