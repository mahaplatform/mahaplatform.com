import { Logo } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Results extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array,
    requires: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records, requires } = this.props
    return (
      <div className="program-chooser-list">
        { records.map((program, index) => (
          <div className={ this._getClass(program) } key={`record_${index}`} onClick={ this._handleChoose.bind(this, program) }>
            <div className="program-chooser-list-item-token">
              <div className="program-token">
                <div className="program-token-logo">
                  <Logo team={ program } width="24" />
                </div>
                <div className="program-token-label">
                  { program.title }
                  { _.includes(requires, 'bank') && !program.bank ? ' (no bank account)' : ''}
                </div>
              </div>
            </div>
            <div className="program-chooser-list-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        )) }
      </div>
    )
  }



  _getClass(program) {
    const { requires } = this.props
    const classes = ['program-chooser-list-item']
    if(_.includes(requires, 'bank') && !program.bank) classes.push('disabled')
    return classes.join(' ')
  }

  _handleChoose(program) {
    const { requires } = this.props
    if(_.includes(requires, 'bank') && !program.bank) return
    this.props.onChoose(program)
  }

}

export default Results