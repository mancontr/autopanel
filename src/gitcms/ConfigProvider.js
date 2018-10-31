import React from 'react'
import PropTypes from 'prop-types'
import Config from './Config'

const ConfigContext = React.createContext(Config)

export const ConfigProvider = ({ children, ...other }) => (
  <ConfigContext.Provider value={other}>
    {children}
  </ConfigContext.Provider>
)

ConfigProvider.propTypes = {
  children: PropTypes.any
}

export const withConfig = (Component) => (props) => (
  <ConfigContext.Consumer>
    {(value) => <Component {...props} config={value} />}
  </ConfigContext.Consumer>
)

export default ConfigProvider
