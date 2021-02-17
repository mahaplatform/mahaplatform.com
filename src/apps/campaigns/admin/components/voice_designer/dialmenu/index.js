import PlayToken from '../play/token'
import SayToken from '../say/token'
import Form from './form'
import React from 'react'

export default {
  icon: 'bars',
  label: 'Dial Menu',
  type: 'voice',
  action: 'dialmenu',
  form: Form,
  token: (step) => (
    <div>
      <div>{ step.name }</div>
      { step.strategy === 'say' && <SayToken { ...step } text="Play Greeting" /> }
      { step.strategy === 'play' && <PlayToken { ...step } text="Play Greeting" /> }
    </div>
  )
}
