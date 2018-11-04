import React from 'react'
import { FormattedMessage } from 'react-intl'
import Config from 'src/gitcms/Config'
import './Login.sass'

export class Login extends React.Component {

  render = () => (
    <main id="login">
      <h1><FormattedMessage id="login" /></h1>
      <div className="box">
        <FormattedMessage id="login.choose" />
        <div className="providers">
          {Config.getProviders().map((providerId) => {
            const p = Config.getProvider(providerId)
            const name = p.getName()
            const action = p.login()
            const style = {
              backgroundImage: 'url("/providers/' + providerId + '.png")'
            }
            return (
              <a className="login-provider" href={action} style={style} key={name}>
                {p.getName()}
              </a>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default Login
