import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Searchbox extends React.Component {

  static propTypes = {
    active: PropTypes.bool,
    autofocus: PropTypes.bool,
    icon: PropTypes.string,
    prompt: PropTypes.string,
    q: PropTypes.string,
    onAbort: PropTypes.func,
    onBegin: PropTypes.func,
    onChange: PropTypes.func,
    onEnd: PropTypes.func,
    onIcon: PropTypes.func,
    onType: PropTypes.func
  }

  static defaultProps = {
    autofocus: false,
    prompt: 'Search...',
    q: '',
    onChange: (value) => {}
  }

  input = null

  _handleAbort = this._handleAbort.bind(this)
  _handleChange = _.debounce(this._handleChange.bind(this), 300)
  _handleIcon = this._handleIcon.bind(this)

  render() {
    const { icon, q } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="maha-searchbox-container">
          { icon &&
            <div className="maha-searchbox-extra" onClick={ this._handleIcon }>
              <i className={ `fa fa-fw fa-${icon}` } />
            </div>
          }
          <div className="maha-searchbox-input">
            <div className="maha-searchbox-icon">
              <i className="fa fa-search" />
            </div>
            <div className="maha-searchbox-field">
              <input { ...this._getInput() } />
            </div>
            { q.length > 0 &&
              <div className="maha-searchbox-remove-icon" onClick={ this._handleAbort }>
                <i className="fa fa-times-circle" />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { autofocus } = this.props
    if(autofocus) setTimeout(() => {
      this.input.focus()
    }, 500)
  }

  _getClass() {
    const classes = ['maha-searchbox']
    if(this.props.active) classes.push('active')
    return classes.join(' ')
  }

  _getInput() {
    const { prompt, q } = this.props
    return {
      ref: node => this.input = node,
      type: 'text',
      placeholder: prompt,
      value: q,
      onFocus: this._handleBegin.bind(this),
      onBlur: this._handleEnd.bind(this),
      onChange: this._handleType.bind(this)
    }
  }

  componentDidUpdate(prevProps) {
    const { q } = this.props
    if(q !== prevProps.q) this._handleChange(q)
  }

  _handleIcon() {
    this.props.onIcon()
  }

  _handleBegin() {
    this.props.onBegin()
  }

  _handleChange(q) {
    this.props.onChange(q)
  }

  _handleEnd() {
    this.props.onEnd()
  }

  _handleType(e) {
    const { onType } = this.props
    onType(e.target.value)
  }

  _handleAbort() {
    this.props.onAbort()
  }

}

export default Searchbox
