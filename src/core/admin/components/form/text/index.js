import PropTypes from 'prop-types'
import Format from '../../format'
import React from 'react'
import _ from 'lodash'

class Text extends React.Component {

  static propTypes = {
    disabled: PropTypes.bool,
    format: PropTypes.any,
    value: PropTypes.string,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: '',
    disabled: false,
    format: ({ value }) => <span>{ value }</span>,
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {}
  }

  render() {
    const { format } = this.props
    const value = _.toString(this.props.value)
    return (
      <div className={ this._getClass() }>
        <Format format={format} value={value} />
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  _getClass() {
    const { disabled } = this.props
    const classes = ['maha-text']
    if(disabled) classes.push('disabled')
    return classes.join(' ')
  }

}

export default Text
