import React from 'react'
import PropTypes from 'prop-types'

class DateTypeEditor extends React.Component {

  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  }

  render = () => {
    const { field, value } = this.props
    const formattedValue = new Date(value).toISOString().substring(0, 16)
    const onChange = (e) => {
      const newDate = Date.parse(e.target.value + ':00Z')
      this.props.onChange(newDate.valueOf())
    }
    return (
      <input type="datetime-local" name={field.name}
        value={formattedValue} onChange={onChange} />
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
