import React from 'react'
import PropTypes from 'prop-types'

class DateTypeEditor extends React.Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any
  }

  render = () => {
    const { field, value } = this.props
    return (
      <input type="datetime-local" name={field.name}
        defaultValue={new Date(value).toISOString().substring(0, 16)} />
    )
  }

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
