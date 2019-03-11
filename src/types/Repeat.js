import React from 'react'
import PropTypes from 'prop-types'
import { EditField } from '../components/EntityEdit'
import Config from '../Config'

const RepeatEditor = ({ field, value, onChange }) => {
  return (
    <React.Fragment>
      {value
        ? value.map((currentValue, i) => (
          <EditField
            key={i}
            field={{
              ...field.content,
              name: field.name + '-' + field.content.name + '-' + i
            }}
            value={currentValue[field.name + '-' + field.content.name + '-' + i]}
            onChange={v => {
              value[i] = { [field.name + '-' + field.content.name + '-' + i]: v }
              onChange(value)
            }}
          />
        ))
        : undefined}

      <button
        onClick={() => {
          if (value) {
            onChange([...value, { [field.name + '-' + field.content.name + '-' + value.length]: undefined }])
          } else {
            onChange([{ [field.name + '-' + field.content.name + '-' + '0']: undefined }])
          }
        }}
      >
        New
      </button>
    </React.Fragment>
  )
}

const preSave = ({ field, value, entity, attachments }) => {
  if(!value) return 
  
  let subEntity = {}

  value.forEach((childValue, i) => {
    subEntity = {}
    const childFieldType = Config.getType(field.content.type)
    const previousAttatchmentsLength = attachments.length
    childFieldType &&
      childFieldType.preSave &&
      childFieldType.preSave({
        field: {
          ...field.content,
          name: field.name + '-' + field.content.name + '-' + i
        },
        value: childValue[field.name + '-' + field.content.name + '-' + i],
        entity: subEntity,
        attachments
      })
    if (attachments.length > previousAttatchmentsLength) {
      for (var j = previousAttatchmentsLength; j < attachments.length; j++) {
        const attachment = attachments[j]
        attachment.field = field.name + '-' + field.content.name + '-' + i + '-' + attachment.field
      }
    }
    value[i] = subEntity
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
