import React from 'react'
import PropTypes from 'prop-types'

class TextTypeEditor extends React.Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any
  }

  render = () => (
    <label>
      {this.props.field.name}
      <input type="text" name={this.props.field.name} />
    </label>
  )

}

const TextTypeViewer = (props) => (
  <span>{props.value}</span>
)

TextTypeViewer.propTypes = {
  value: PropTypes.any
}

export default {
  view: TextTypeViewer,
  edit: TextTypeEditor
}
