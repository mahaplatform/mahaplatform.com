import PropTypes from 'prop-types'
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
      <div className={ this._getClass() } onClick={ this._handleChoose.bind(this, domain) }>
        <div className="websites-domain-lookup-result-name">
          <strong>{ domain.name }</strong><br />
          { numeral(domain.price).format('$0.00') }
        </div>
        <div className="websites-domain-lookup-result-status">
          { domain.status !== 'available' &&
            <span>unavailable</span>
          }
        </div>
        <div className="websites-domain-lookup-result-proceed">
          { domain.status === 'available' &&
            <i className="fa fa-chevron-right" />
          }
        </div>
      </div>
    )
  }

  _getClass() {
    const { domain } = this.props
    const classes = ['websites-domain-lookup-result']
    if(domain.status !== 'available') classes.push('unavailable')
    return classes.join(' ')
  }

  _handleChoose(domain) {
    if(domain.status !== 'available') return
    this.props.onChoose(domain.name)
  }

}

export default Result
