import PropTypes from 'prop-types'
import React from 'react'

class Criteria extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    criteria: PropTypes.object,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Specify dynamic criteria'
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)

  render() {
    const { criteria, placeholder, tabIndex } = this.props
    return (
      <div className="crm-criteria" tabIndex={ tabIndex }>
        { criteria &&
          <div className="crm-criteria-clear">
            <i className="fa fa-times" onClick={ this._handleClear.bind(this) } />
          </div>
        }
        { !criteria &&
          <div className="crm-criteria-prompt" onClick={ this._handleBegin.bind(this) }>
            { placeholder }
          </div>
        }
      </div>    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {}

  _handleBegin() {

  }

  _handleClear() {

  }


}

export default Criteria
