import PropTypes from 'prop-types'
import Panel from './panel'
import React from 'react'

class Emojis extends React.Component {

  static propTypes = {
    changing: PropTypes.bool,
    skinTone: PropTypes.string,
    skinToneIndex: PropTypes.number,
    status: PropTypes.string,
    onChangeSkinTone: PropTypes.func,
    onChoose: PropTypes.func,
    onClose: PropTypes.func,
    onLoadSkinTone: PropTypes.func,
    onSaveSkinTone: PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {},
    onClose: () => {}
  }

  emojis = null

  state = {
    position: 'above',
    show: false
  }

  _handleClickOutside = this._handleClickOutside.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { position, show } = this.state
    return (
      <div className="maha-emojis" ref={ node => this.emojis = node }>
        <div className="maha-emojis-icon" onClick={ this._handleToggle }>
          <i className="fa fa-smile-o" />
        </div>
        { show &&
          <div className={`maha-emojis-chooser ${position}`}>
            <div className="maha-emojis-chooser-inner">
              <Panel { ...this._getPanel() } />
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onLoadSkinTone()
    document.addEventListener('mousedown', this._handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside)
  }

  _getPanel() {
    return this.props
  }

  _handleClickOutside(e) {
    if(e.target.className === 'fa fa-fw fa-smile-o') return
    if(this.emojis && this.emojis.contains(e.target)) return
    this.setState({
      show: false
    })
  }

  _handleToggle(e) {
    const { show } = this.state
    const percent = (e.clientY / window.innerHeight) * 100
    this.setState({
      position: percent < 75 ? 'below' : 'above',
      show: !show
    })
  }

}

export default Emojis
