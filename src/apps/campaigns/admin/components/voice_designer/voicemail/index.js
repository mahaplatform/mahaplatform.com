import PlayToken from '../play/token'
import SayToken from '../say/token'
import Form from './form'
import React from 'react'

export default {
  icon: 'voicemail',
  label: 'Voicemail',
  type: 'voice',
  action: 'voicemail',
  form: Form,
  token: (step) => (
    <div>
      { step.strategy === 'say' && <SayToken { ...step } text="Play Greeting" /> }
      { step.strategy === 'play' && <PlayToken { ...step } text="Play Greeting" /> }
    </div>
  )
}
