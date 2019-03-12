import React from 'react'
import PropTypes from 'prop-types'
import { EditField } from '../components/EntityEdit'
import Config from '../Config'

const RepeatEditor = ({ field, value, onChange }) => {
  return (
    <React.Fragment>
      {value
        ? value.map((currentValue, i) => (
          <React.Fragment key={i}>
            <EditField
              field={{
                ...field.content,
                name: field.name + '[' + i + ']'
              }}
              value={currentValue}
              onChange={v => {
                value[i] = v
                onChange(value)
              }}
            />
            <button
              onClick={() => {
                value.splice(i, 1)
                onChange(value)
              }}
            >
                Remove
            </button>
          </React.Fragment>
        ))
        : undefined}

      <button
        onClick={() => {
          if (value) {
            onChange([...value, undefined])
          } else {
            onChange([undefined])
          }
        }}
      >
        New
      </button>
    </React.Fragment>
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
  preSave
}
