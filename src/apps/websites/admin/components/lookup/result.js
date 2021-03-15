import PropTypes from 'prop-types'
import { Button } from '@admin'
import numeral from 'numeral'
import React from 'react'

class Result extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    domain: PropTypes.object,
    onChoose: PropTypes.func
  }

  render() {
    const { domain } = this.props
    return (
      <div className="websites-domain-lookup-result">
        <div className="websites-domain-lookup-result-name">
          <strong>{ domain.name }</strong><br />
          { numeral(domain.price).format('$0.00') }
        </div>
        <div className="websites-domain-lookup-result-status">
          { domain.status === 'available' ?
            <Button { ...this._getButton() } /> :
            <span>unavailable</span>
          }
        </div>
      </div>
    )
  }

  _getButton() {
    const { domain } = this.props
    return {
      label: 'Register',
      color: 'green',
      size: 'tiny',
      handler: this._handleChoose.bind(this, domain.name)
    }
  }

  _handleChoose(name) {
    this.props.onChoose(name)
  }

}

export default Result
