import Token from '../../tokens/token'
import PropTypes from 'prop-types'
import Options from './options'
import React from 'react'

class Picklist extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    format: PropTypes.any,
    options: PropTypes.array,
    onChoose: PropTypes.func
  }

  static defaultProps = {
    format: Token
  }

  render() {
    return (
      <div className="picklist">
        <Options { ...this._getOptions() } />
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getOptions() {
    const { format, options, onChoose } = this.props
    return {
      format,
      options: options.map(option => {
        return { value: option, text: option }
      }),
      onChoose
    }
  }

}

export default Picklist
