import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Addressfield extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    autocomplete: PropTypes.any,
    geocoder: PropTypes.any,
    code: PropTypes.string,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    q: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    value: PropTypes.object,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onChangeMode: PropTypes.func,
    onChoose: PropTypes.func,
    onClear: PropTypes.func,
    onQuery: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onSetOptions: PropTypes.func,
    onSetStreet2: PropTypes.func,
    onValidate: PropTypes.func
  }

  state = {
    direction: null,
    focused: false,
    ready: false,
    selected: null
  }

  input = null
  options = {}

  _handleAutocomplete = this._handleAutocomplete.bind(this)
  _handleBlur = this._handleBlur.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleChangeMode = this._handleChangeMode.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleGeocode = this._handleGeocode.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)
  _handleLookup = this._handleLookup.bind(this)
  _handleSetStreet2 = this._handleSetStreet2.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { options, value } = this.props
    return (
      <div className="maha-addressfield-lookup">
        <div className="maha-input">
          <div className="maha-input-field" onClick={ this._handleBegin }>
            { value ?
              <div className="maha-input-token">
                { value.description }
              </div> :
              <input { ...this._getInput() } />
            }
            { !value && options &&
              <div className={ this._getResultClass() }>
                { options.map((option, index) => (
                  <div { ...this._getOption(option, index) } key={`option_${index}`}>
                    <div className="maha-addressfield-result-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="maha-addressfield-result-details">
                      <strong>{ option.match }</strong>{ option.remaining }
                    </div>
                  </div>
                )) }
                <div className="maha-addressfield-result-add" onClick={ this._handleChangeMode }>
                  Cant find your address? Enter it manually
                </div>
              </div>
            }
          </div>
          { value &&
            <div className="maha-input-clear" onClick={ this._handleClear }>
              <i className="fa fa-times" />
            </div>
          }
        </div>
        { value &&
          <div className="maha-addressfield-street2">
            <input { ...this._getStreet2() } />
          </div>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { q, status } = this.props
    if(q !== prevProps.q) {
      if(q.length === 0) this.props.onSetOptions([])
      this._handleLookup()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getClass(index) {
    const { selected } = this.state
    const classes = ['maha-addressfield-result']
    if(index === selected) classes.push('selected')
    return classes.join(' ')
  }

  _getCounty(result) {
    const component = result.address_components.find(component => {
      return component.long_name.toLowerCase().match(/county/)
    })
    return component ? component.short_name : null
  }

  _getInput() {
    const { htmlFor, placeholder, tabIndex } = this.props
    const { focused } = this.state
    return {
      id: htmlFor,
      type: 'text',
      placeholder: !focused ? placeholder : null,
      ref: node => this.input = node,
      tabIndex,
      onBlur: this._handleBlur,
      onChange: this._handleType,
      onFocus: this._handleFocus,
      onKeyDown: this._handleKeyDown
    }
  }

  _getStreet2() {
    const { tabIndex, value } = this.props
    const street_2 = value.street_2 || ''
    return {
      type: 'text',
      placeholder: street_2.length === 0 ? 'Enter Suite, Apartment, or PO Box' : null,
      tabIndex,
      value: street_2,
      onChange: this._handleSetStreet2
    }
  }

  _handleLookup() {
    const { autocomplete, q } = this.props
    this.setState({ selected: null })
    if(!q || q.length == 0) return
    autocomplete.getPlacePredictions({
      input: q
    }, this._handleAutocomplete)
  }

  _getOption(option, index) {
    return {
      className: this._getClass(index),
      onClick: this._handleChoose.bind(this, option),
      ref: node => this.options[index] = node
    }
  }

  _getResultClass() {
    const { direction } = this.state
    return ['maha-addressfield-results', direction].join(' ')
  }

  _getType(result, type) {
    const component = result.address_components.find(component => {
      return _.includes(component.types, type)
    })
    return component ? component.short_name : null
  }

  _handleAutocomplete(result) {
    const { q } = this.props
    const options = result || []
    this.props.onSetOptions(options.map(option => {
      const { main_text, secondary_text } = option.structured_formatting
      const full = `${main_text}, ${secondary_text}`
      const match = full.match(new RegExp(q, 'i'), '')
      return {
        ...option,
        match: match ? q : main_text,
        remaining: match ? full.replace(new RegExp(q, 'i'), '') : `, ${secondary_text}`
      }
    }))
  }

  _handleBlur() {
    this.setState({
      focused: false
    })
  }

  _handleChangeMode() {
    this.props.onChangeMode()
  }

  _handleChoose(address) {
    const { geocoder } = this.props
    geocoder.geocode({
      placeId: address.place_id
    }, this._handleGeocode)
  }

  _handleClear() {
    this.props.onClear()
  }

  _handleFocus() {
    this.setState({
      focused: true
    })
  }

  _handleGeocode(results) {
    const result = results[0]
    this.props.onChoose({
      description: result.formatted_address,
      street_1: `${this._getType(result, 'street_number')} ${this._getType(result, 'route')}`,
      street_2: null,
      city: this._getType(result, 'locality'),
      state_province: this._getType(result, 'administrative_area_level_1'),
      postal_code: this._getType(result, 'postal_code'),
      county: this._getCounty(result),
      country: this._getType(result, 'country'),
      latitude: result.geometry.location.lat(),
      longitude: result.geometry.location.lng()
    })
  }

  _handleKeyDown(e) {
    const { direction, selected } = this.state
    const { options } = this.props
    if(e.which === 38 && direction === 'up') {
      this.setState({
        selected: selected !== null ? (selected === 0 ? options.length - 1 : selected - 1) : options.length -1
      })
    } else if(e.which === 38 && direction === 'down') {
      this.setState({
        selected: selected !== null  ? (selected === 0 ? options.length - 1 : selected - 1) : options.length - 1
      })
    } else if(e.which === 40 && direction === 'down') {
      this.setState({
        selected: selected !== null  ? (selected === options.length - 1 ? 0 : selected + 1) : 0
      })
    } else if(e.which === 40 && direction === 'up') {
      this.setState({
        selected: selected !== null  ? (selected === options.length - 1 ? 0 : selected + 1) : 0
      })
    } else if(selected !== null && e.which === 13) {
      this._handleChoose(options[selected])
    }
  }

  _handleSetStreet2(e) {
    this.props.onSetStreet2(e.target.value)
  }

  _handleType(e) {
    e.stopPropagation()
    var { top } = this.input.getBoundingClientRect()
    const percent = (top / window.innerHeight) * 100
    const direction = percent > 75 ? 'up' : 'down'
    this.setState({ direction })
    this.props.onQuery(e.target.value)
  }

  _handleValidate() {
    const { required, value } = this.props
    if(required && !value) {
      this.props.onValidate(null, 'This field is required')
    } else {
      this.props.onValidate(value)
    }
  }

}

export default Addressfield
