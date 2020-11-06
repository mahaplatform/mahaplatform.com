import React from 'react'

const strategies = {
  maha: {
    service: 'maha',
    title: 'Maha',
    description: 'Use local Maha authentication'
  },
  cornell: {
    service: 'cornell',
    title: 'Cornell',
    description: 'Use Cornell\'S 2-factor authectication'
  },
  google: {
    service: 'google',
    title: 'Google',
    description: 'Use Google\'s OAuth2 authentication'
  },
  ldap: {
    service: 'ldap',
    title: 'LDAP',
    description: 'Use a public LDAP directory service'
  }
}

const AuthenticationStrategyToken = ({ value }) => {
  const strategy = strategies[value.toLowerCase()]
  return (
    <div className="authentication-strategy-token">
      <div className="authentication-strategy-token-icon">
        <img src={`/images/services/${strategy.service}.png`} />
      </div>
      <div className="authentication-strategy-token-label">
        <strong>{ strategy.title }</strong><br />
        { strategy.description }
      </div>
    </div>
  )
}

export default AuthenticationStrategyToken
