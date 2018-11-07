import React from 'react'
import PropTypes from 'prop-types'

class DateTypeEditor extends React.Component {

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

const DateTypeViewer = (props) => (
  <span>{new Date(props.value).toLocaleString()}</span>
)

DateTypeViewer.propTypes = {
  value: PropTypes.any
}

export default {
  name: 'date',
  view: DateTypeViewer,
  edit: DateTypeEditor
}
