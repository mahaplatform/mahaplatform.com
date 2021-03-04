import Dependencies from '../../dependencies'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Addressfield extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    options: PropTypes.array,
    placeholder: PropTypes.string,
    q: PropTypes.string,
    value: PropTypes.object,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onClear: PropTypes.func,
    onQuery: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onSetOptions: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Search for a place or address',
    onChange: () => {},
    onReady: () => {}
  }

  autocomplete = null
  geocoder = null

  _handleAutocomplete = this._handleAutocomplete.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleGeocode = this._handleGeocode.bind(this)
  _handleInit = this._handleInit.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { options, value } = this.props
    return (
      <div className="addressfield">
        <div className="addressfield-field" onClick={ this._handleBegin }>
          { value &&
            <div className="addressfield-token">
              { value.description }
            </div>
          }
          { !value &&
            <input { ...this._getInput() } />
          }
          { options.length > 0 &&
            <div className="addressfield-results">
              { options.map((option, index) => (
                <div className="addressfield-result" key={`option_${index}`} onClick={ this._handleChoose.bind(this, option) }>
                  <div className="addressfield-result-icon">
                    <i className="fa fa-map-marker" />
                  </div>
                  <div className="addressfield-result-details">
                    <strong>{ option.structured_formatting.main_text }</strong><br />
                    { option.structured_formatting.secondary_text }
                  </div>
                </div>
              )) }
            </div>
          }
        </div>
        { value &&
          <div className="addressfield-remove" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleInit()
  }

  componentDidUpdate(prevProps, prevState) {
    const { q, value, onChange } = this.props
    if(q !== prevProps.q) {
      if(q.length === 0) this.props.onSetOptions([])
      this.autocomplete.getPlacePredictions({
        input: q
      }, this._handleAutocomplete)
    }
    if(!_.isEqual(value, prevProps.value)) {
      onChange(value)
    }
  }

  _getCounty(result) {
    const component = result.address_components.find(component => {
      return component.long_name.toLowerCase().match(/county/)
    })
    return component ? component.short_name : null
  }

  _getInput() {
    const { placeholder } = this.props
    return {
      type: 'textfield',
      placeholder,
      onChange: this._handleType
    }
  }

  _getType(result, type) {
    const component = result.address_components.find(component => {
      return _.includes(component.types, type)
    })
    return component ? component.short_name : null
  }

  _handleAutocomplete(options) {
    this.props.onSetOptions(options || [])
  }

  _handleChoose(address) {
    this.geocoder.geocode({
      placeId: address.place_id
    }, this._handleGeocode)
  }

  _handleClear() {
    this.props.onClear()
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
    this.autocomplete = new window.google.maps.places.AutocompleteService()
    this.geocoder = new window.google.maps.Geocoder()
    this.props.onReady()
  }

  _handleType(e) {
    this.props.onQuery(e.target.value)
  }

}

const dependencies = {
  scripts: [
    { url: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`, check: 'google.maps' }
  ]
}

Addressfield = Dependencies(dependencies)(Addressfield)

export default Addressfield
