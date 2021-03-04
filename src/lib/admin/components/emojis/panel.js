import categories from './categories'
import PropTypes from 'prop-types'
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

  _handleChangeSkinTone = this._handleChangeSkinTone.bind(this)
  _handleSaveSkinTone = this._handleSaveSkinTone.bind(this)

  render() {
    const { changing, skinTone, status } = this.props
    if(status !== 'loaded') return null
    return (
      <div className="maha-emojis-panel">
        <div className="maha-emojis-body">
          { categories.map((category, i) => (
            <div className="maha-emojis-category" key={`category_${i}`}>
              <div className="maha-emojis-category-title">{ category.title }</div>
              <div className="maha-emojis-category-emojis">
                { category.emojis.map((emoji, j) => (
                  <div className="maha-emojis-category-emoji" key={`emoji_${j}`} onClick={ this._handleChoose.bind(this, emoji) }>
                    <span className={`emoji emoji-${this._getWithSkinTone(emoji)}`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        { changing ?
          <div className="maha-emojis-footer">
            <div className="maha-emojis-footer-label">
              Skin Tone:
            </div>
            <div className="maha-emojis-footer-emoji" onClick={ this._handleSaveSkinTone.bind(this, null) }>
              <span className="emoji emoji-1f91a" />
            </div>
            <div className="maha-emojis-footer-emoji" onClick={ this._handleSaveSkinTone.bind(this, 0) }>
              <span className="emoji emoji-1f91a-1f3fb" />
            </div>
            <div className="maha-emojis-footer-emoji" onClick={ this._handleSaveSkinTone.bind(this, 1) }>
              <span className="emoji emoji-1f91a-1f3fc" />
            </div>
            <div className="maha-emojis-footer-emoji" onClick={ this._handleSaveSkinTone.bind(this, 2) }>
              <span className="emoji emoji-1f91a-1f3fd" />
            </div>
            <div className="maha-emojis-footer-emoji" onClick={ this._handleSaveSkinTone.bind(this, 3) }>
              <span className="emoji emoji-1f91a-1f3fe" />
            </div>
            <div className="maha-emojis-footer-emoji" onClick={ this._handleSaveSkinTone.bind(this, 4) }>
              <span className="emoji emoji-1f91a-1f3ff" />
            </div>
          </div> :
          <div className="maha-emojis-footer">
            <div className="maha-emojis-footer-label">
              Skin Tone:
            </div>
            <div className="maha-emojis-footer-emoji" onClick={ this._handleChangeSkinTone }>
              <span className={`emoji emoji-1f91a${skinTone ? `-${skinTone}` : ''}`} />
            </div>
          </div>
        }

      </div>
    )
  }

  _getWithSkinTone(emoji) {
    if(!emoji.skin)return emoji.code
    const { skinTone } = this.props
    if(skinTone === null) return emoji.code
    const parts = emoji.code.split('-')
    if(parts.length === 1) return `${emoji.code}-${skinTone}`
    if(parts.length === 2) return `${parts[0]}-${skinTone}`
    if(parts.length === 5) return `${parts[0]}-${skinTone}-${parts.slice(2).join('-')}`
    if(parts.length < 6) return `${parts[0]}-${skinTone}-${parts.slice(1).join('-')}`
    return `${parts.slice(0, -1)}-${skinTone}`
  }

  _handleChangeSkinTone() {
    this.props.onChangeSkinTone()
  }

  _handleSaveSkinTone(index) {
    this.props.onSaveSkinTone(index)
  }

  _handleChoose(emoji) {
    const code = this._getWithSkinTone(emoji)
    const unicode = code.split('-').map(code => String.fromCodePoint(`0x${code}`)).join('')
    this.props.onChoose(unicode)
  }

}

export default Emojis
