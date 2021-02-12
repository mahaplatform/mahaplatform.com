import PropTypes from 'prop-types'
import { Button } from '@admin'
import React from 'react'

class Step extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    step: PropTypes.object
  }

  render() {
    const { step } = this.props
    return (
      <>
        { step.verb === 'play' &&
          <>played <Button { ...this._getPlay(step.key) } /></>
        }
        { step.verb === 'say' &&
          <>said <Button { ...this._getSay(step.voice, step.text) } /></>
        }
        { step.verb === 'voicemail' && step.action === 'ask' && step.ask.verb === 'say' &&
          <>said <Button { ...this._getSay(step.ask.voice, step.ask.text) } /></>
        }
        { step.verb === 'voicemail' && step.action === 'ask' && step.ask.verb === 'play' &&
          <>played <Button { ...this._getPlay(step.ask.key) } /></>
        }
        { step.verb === 'voicemail' && step.action === 'complete' &&
          <>said <Button { ...this._getPlay(step.key) } /></>
        }
        { step.verb === 'dial' && step.action === 'announce' && step.announce.verb === 'say' &&
          <>said <Button { ...this._getSay(step.announce.voice, step.announce.text) } /></>
        }
        { step.verb === 'dial' && step.action === 'announce' && step.announce.verb === 'play' &&
          <>played <Button { ...this._getPlay(step.announce.key) } /></>
        }
        { step.verb === 'dial' && step.action === 'forward' &&
          <>forwarded call</>
        }
      </>
    )
  }

  _getPlay(key) {
    return {
      label: 'recording',
      className: 'link',
      handler: this._handlePlay.bind(this, key)
    }
  }

  _getSay(voice, text) {
    return {
      label: text,
      className: 'link',
      handler: this._handleSay.bind(this, voice, text)
    }
  }

  _handlePlay(key) {
    const { flash, network } = this.context
    const matches = key.match(/assets\/(\d*)\/.*/)
    network.request({
      endpoint: `/api/admin/assets/${matches[1]}`,
      method: 'get',
      onSuccess: (result) => {
        const audio = new Audio(result.data.signed_url)
        audio.play()
      },
      onFailure: () => flash.set('error', 'Unable to play recording')
    })
  }

  _handleSay(voice, text) {
    const { team } = this.context.admin
    const audio = new Audio(`/api/admin/speak?text=${encodeURIComponent(text)}&voice=${voice}&token=${team.token}`)
    audio.play()
  }

}

export default Step
