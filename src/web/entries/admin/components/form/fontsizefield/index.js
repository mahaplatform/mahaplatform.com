import Lookup from '../lookup'
import React from 'react'

const font_sizes = [8,9,10,11,12,14,18,24,30,36,48,60,72,96,108].map(value => ({
  value,
  text: `${value}px`
}))

class FontSizeField extends React.Component {

  render() {
    return <Lookup { ...this._getLookup() } />
  }

  _getLookup() {
    return {
      ...this.props,
      type: 'lookup',
      options: font_sizes,
      placeholder: 'Choose a size'
    }
  }

}

export default FontSizeField
