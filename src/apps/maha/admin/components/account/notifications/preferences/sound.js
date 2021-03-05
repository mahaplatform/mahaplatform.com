import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Sound extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    onDone: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    selected: null
  }

  sounds = [
    { value: 'ding', text: 'Ding' },
    { value: 'boing', text: 'Boing' },
    { value: 'drop', text: 'Drop' },
    { value: 'tada', text: 'Tada' },
    { value: 'plink', text: 'Plink' },
    { value: 'wow', text: 'Wow' },
    { value: 'here_you_go', text: 'Here you go' },
    { value: 'hi', text: 'Hi' },
    { value: 'knock_brush', text: 'Knock Brush' },
    { value: 'whoah', text: 'Whoah!' },
    { value: 'yoink', text: 'Yoink' }
  ]

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { selected } = this.state
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-options">
          { this.sounds.map((sound, index) => (
            <div className="maha-option" key={ `sound_${index}` } onClick={ this._handleChoose.bind(this, index)}>
              <div className="maha-option-icon" onClick={ this._handleClick.bind(this, index)}>
                <i className="fa fa-fw fa-volume-up" />
              </div>
              <div className="maha-option-label">
                { sound.text }
                { index === selected &&
                  <i className="fa fa-fw fa-check" />
                }
              </div>
            </div>
          ))}
        </div>
      </ModalPanel>
    )
  }

  componentDidMount(){
    const { defaultValue } = this.props
    const selected = _.findIndex(this.sounds, { value: defaultValue })
    this.setState({ selected })
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    if(selected !== prevState.selected && prevState.selected !== null) {
      this._handleDone()
    }
  }

  _getPanel() {
    return {
      title: 'Choose Sound',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChoose(index) {
    this._handlePlay(index)
    this.setState({
      selected: index
    })
  }

  _handleDone() {
    const { selected } = this.state
    const sound = this.sounds[selected]
    this.props.onDone(sound.value)
    this.context.form.pop()
  }

  _handleClick(index, e) {
    e.stopPropagation()
    this._handlePlay(index)
  }

  _handlePlay(index) {
    const sound = this.sounds[index]
    const audio = new Audio(`/audio/${sound.value}.mp3`)
    audio.play()
  }

}

export default Sound
