import PropTypes from 'prop-types'
import Chooser from './chooser'
import React from 'react'
import _ from 'lodash'

class Options extends React.Component {

  static propTypes = {
    product: PropTypes.object,
    onChange: PropTypes.func
  }

  state = {
    options: {}
  }

  render() {
    const { product } = this.props
    return (
      <div className="store-options">
        { product.options.map((option, index) => (
          <div className="store-option" key={`options_${index}`}>
            <Chooser { ...this._getChooser(option) } />
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    const { product } = this.props
    this.setState({
      options: product.options.reduce((options, option) => ({
        ...options,
        [option.title]: option.values[0]
      }), {})
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { options } = this.state
    if(!_.isEqual(options, prevState.options)) {
      this._handleChange()
    }
  }

  _getChooser(option) {
    return {
      ...option,
      onChange: this._handleUpdate.bind(this, option.title)
    }
  }

  _handleChange() {
    const { options } = this.state
    const { product } = this.props
    const index = product.variants.findIndex(variant => {
      return variant.options.find(option => {
        return options[option.option] !== option.value
      }) === undefined
    })
    if(index < 0) return
    this.props.onChange(index)
  }

  _handleUpdate(option, value) {
    this.setState({
      options: {
        ...this.state.options,
        [option]: value
      }
    })
  }

}

export default Options
