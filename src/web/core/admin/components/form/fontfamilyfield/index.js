import PropTypes from 'prop-types'
import FontToken from './token'
import Lookup from '../lookup'
import React from 'react'

const font_families = [
  { value: 'Arial, Helvetica, sans-serif', text: 'Arial' },
  { value: '"Comic Sans MS", cursive, sans-serif', text: 'Comic Sans' },
  { value: '"Courier New", Courier, monospace', text: 'Courier New' },
  { value: 'Georgia, serif', text: 'Georgia' },
  { value: '"Helvetica Neue", Helvetica, Arial, Verdana, sans-serif', text: 'Helvetica' },
  { value: '"Lucida Sans Unicode", "Lucida Grande", sans-serif', text: 'Lucida' },
  { value: 'Tahoma, Geneva, sans-serif', text: 'Tahoma' },
  { value: '"Times New Roman", Times, serif', text: 'Times New Roman' },
  { value: '"Trebuchet MS", Helvetica, sans-serif', text: 'Trebuchet MS' },
  { value: 'Verdana, Geneva, sans-serif', text: 'Verdana' }
]

class FontFamilyField extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    text: PropTypes.string
  }

  static defaultProps = {
    value: 'value',
    text: 'text'
  }

  render() {
    return <Lookup { ...this._getLookup() } />
  }

  _getLookup() {
    const { text, value } = this.props
    return {
      ...this.props,
      type: 'lookup',
      options: font_families,
      format: FontToken,
      value,
      text
    }
  }

}

export default FontFamilyField
