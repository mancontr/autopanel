import React from 'react'
import PropTypes from 'prop-types'

class TextTypeEditor extends React.Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any
  }

  render = () => {
    const { field, value } = this.props
    return (
      <input type="text" name={field.name} defaultValue={value}
        placeholder={field.placeholder} />
    )
  }

}

const TextTypeViewer = (props) => (
  <span>{props.value}</span>
)

TextTypeViewer.propTypes = {
  value: PropTypes.any
}

export default {
  name: 'text',
  view: TextTypeViewer,
  edit: TextTypeEditor
}
