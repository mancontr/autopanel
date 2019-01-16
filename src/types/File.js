import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

const HumanSize = ({ size }) => {
  const byteUnits = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = -1
  do {
    size = size / 1024
    i++
  } while (size > 1024)

  return size.toFixed(1) + ' ' + byteUnits[i]
}
HumanSize.propTypes = {
  size: PropTypes.number.isRequired
}

const FileTypeEditor = ({ field, value, onChange }) => {
  const handleSelect = () => {
    const picker = document.createElement('input')
    picker.type = 'file'
    picker.onchange = (e) => onChange(e.target.files[0])
    picker.click()
  }
  const handleRemove = () => {
    onChange(false)
  }
  return (
    <div className="file-picker">
      {value && (
        <div className="file-info">
          <span className="filename">{value.name}</span>
          <span className="size">(<HumanSize size={value.size} />)</span>
        </div>
      )}
      {!value && (
        <div className="no-file">
          <FormattedMessage id="files.none" />
        </div>
      )}
      <button type="button" className="file-select" onClick={handleSelect}>
        <FormattedMessage id="files.select" />
      </button>
      {value && (
        <span className="file-remove" onClick={handleRemove}>
          <FormattedMessage id="files.remove" />
        </span>
      )}
    </div>
  )
}

FileTypeEditor.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.oneOf(PropTypes.object, PropTypes.bool),
  onChange: PropTypes.func.isRequired
}

const FileTypeViewer = (props) => (
  <span>{props.value}</span>
)

FileTypeViewer.propTypes = {
  value: PropTypes.any
}

const preSave = ({ field, value, entity, attachments }) => {
  if (value) {
    attachments.push({ type: 'file', file: value })
    const { name, size, type, lastModified } = value
    entity[field.name] = { name, size, type, lastModified }
  }
}

export default {
  name: 'file',
  view: FileTypeViewer,
  edit: FileTypeEditor,
  preSave
}
