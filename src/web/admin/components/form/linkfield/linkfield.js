import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Linkfield extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    link: PropTypes.object,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleFetch = this._handleFetch.bind(this)

  render() {
    const { link } = this.props
    return (
      <div className="linkfield">
        <div className="linkfield-header">
          <input { ...this._getInput() } />
        </div>
        { link &&
          <div className="linkfield-preview">
            <img src={ link.image_url } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { link, onChange } = this.props
    if(!_.isEqual(link, prevProps.link)) {
      onChange(link)
    }
  }


  _getInput() {
    return {
      type: 'text',
      placeholder: 'Paste a URL',
      onChange: this._handleFetch
    }
  }

  _handleFetch(e) {
    this.props.onFetch(e.target.value)
  }

}

export default Linkfield
