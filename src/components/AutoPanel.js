import React from 'react'
import PropTypes from 'prop-types'
import { IntlProvider, injectIntl } from 'react-intl'
import { WithAutoPanel } from '../api'
import locales from '../locales/index'
import ErrorBoundary from './ErrorBoundary'

const Wrapper = ({ settings, children, intl }) => {
  const messages = locales[intl.locale] || locales['en']
  return (
    <ErrorBoundary>
      <IntlProvider messages={messages}>
        <WithAutoPanel settings={settings}>
          {children}
        </WithAutoPanel>
      </IntlProvider>
    </ErrorBoundary>
  )
}

Wrapper.propTypes = {
  settings: PropTypes.object,
  children: PropTypes.any
}

export default injectIntl(Wrapper)
