import { Dropdown } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class BorderField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    selected: []
  }

  render() {
    return (
      <div className="borderfield">
        <Dropdown { ...this._getDropdown() } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this._handleSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    if(!_.isEqual(selected, prevState.selected)) {
      this.props.onChange(selected)
    }
  }

  _getDropdown() {
    return {
      options: ['solid','dashed']
    }
  }

  _handleSet(selected) {
    this.setState({ selected })
  }

}

export default BorderField
