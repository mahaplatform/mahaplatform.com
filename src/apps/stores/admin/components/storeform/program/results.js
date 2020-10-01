import { Logo } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="programs-list">
        { records.map((program, index) => (
          <div className={ this._getClass(program) } key={`record_${index}`} onClick={ this._handleChoose.bind(this, program) }>
            <div className="programs-list-item-token">
              <div className="program-token">
                <div className="program-token-logo">
                  <Logo team={ program } width="24" />
                </div>
                <div className="program-token-label">
                  { program.title }
                  { !program.bank ? ' (no bank account)' : ''}
                </div>
              </div>
            </div>
            <div className="programs-list-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getClass(program) {
    const classes = ['programs-list-item']
    if(!program.bank) classes.push('disabled')
    return classes.join(' ')
  }

  _handleChoose(record) {
    if(!record.bank) return
    this.props.onChoose(record)
  }

}

export default Results
