import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Addressfield extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    htmlFor: PropTypes.string,
    name: PropTypes.object,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    q: PropTypes.string,
    required: PropTypes.object,
    status: PropTypes.object,
    value: PropTypes.object,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onClear: PropTypes.func,
    onQuery: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onSetOptions: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Search for a place or address',
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    direction: null,
    focused: false,
    ready: false
  }

  autocomplete = null
  input = null
  geocoder = null

  _handleAutocomplete = this._handleAutocomplete.bind(this)
  _handleBlur = this._handleBlur.bind(this)
  _handleCheck = this._handleCheck.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleGeocode = this._handleGeocode.bind(this)
  _handleInit = this._handleInit.bind(this)
  _handleLoad = this._handleLoad.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { options, value } = this.props
    return (
      <div className="maha-input">
        <div className="maha-input-field" onClick={ this._handleBegin }>
          { value ?
            <div className="maha-input-token">
              { value.description }
            </div> :
            <input { ...this._getInput() } />
          }
          { options.length > 0 &&
            <div className={ this._getResultClass() }>
              { options.map((option, index) => (
                <div className="addressfield-result" key={`option_${index}`} onClick={ this._handleChoose.bind(this, option) }>
                  <div className="addressfield-result-icon">
                    <i className="fa fa-map-marker" />
                  </div>
                  <div className="addressfield-result-details">
                    <strong>{ option.match }</strong>{ option.remaining }
                  </div>
                </div>
              )) }
            </div>
          }
        </div>
        { value &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleLoad()
  }

  componentDidUpdate(prevProps, prevState) {
    const { q, status, value, onChange, onReady } = this.props
    const { ready } = this.state
    if(ready !== prevState.ready) {
      onReady()
    }
    if(q !== prevProps.q) {
      if(q.length === 0) this.props.onSetOptions([])
      this.autocomplete.getPlacePredictions({
        input: q
      }, this._handleAutocomplete)
    }
    if(!_.isEqual(value, prevProps.value)) {
      onChange(value)
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }

  }

  _getCounty(result) {
    const component = result.address_components.find(component => {
      return component.long_name.toLowerCase().match(/county/)
    })
    return component ? component.short_name : null
  }

  _getInput() {
    const { htmlFor, placeholder } = this.props
    const { focused } = this.state
    return {
      id: htmlFor,
      type: 'text',
      placeholder: !focused ? placeholder : null,
      ref: node => this.input = node,
      onBlur: this._handleBlur,
      onChange: this._handleType,
      onFocus: this._handleFocus
    }
  }

  _getResultClass() {
    const { direction } = this.state
    const classes = ['addressfield-results', direction]
    return classes.join(' ')
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

  _handleCheck() {
    const ready = typeof window !== 'undefined' && typeof window.google !== 'undefined' && typeof window.google.maps !== 'undefined'
    if(ready) return this._handleInit()
    this.setState({ ready })
    setTimeout(this._handleCheck, 1000)
  }

  _handleChoose(address) {
    this.geocoder.geocode({
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

  _handleInit() {
    this.setState({ ready: true })
    this.autocomplete = new window.google.maps.places.AutocompleteService()
    this.geocoder = new window.google.maps.Geocoder()
  }

  _handleLoad() {
    const ready = typeof window !== 'undefined' && typeof window.google !== 'undefined' && typeof window.google.maps !== 'undefined'
    if(ready) return this._handleInit()
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`
    document.body.appendChild(script)
    setTimeout(this._handleCheck, 1000)
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
