import React from 'react'
import { FormattedMessage } from 'react-intl'

export class Settings extends React.Component {
  render = () => (
    <React.Fragment>
      <h1><FormattedMessage id="settings" /></h1>
      <div className="box">
        ...
      </div>
      <div className="box">
        ...
      </div>
    </React.Fragment>
  )
}

export default Settings
