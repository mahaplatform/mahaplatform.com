import ModalPanel from '../../modal_panel'
import Searchbox from '../../searchbox'
import { connect } from 'react-redux'
import Message from '../../message'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Chooser extends React.Component {

  static propTypes = {
    options: PropTypes.array,
    prompt: PropTypes.string,
    q: PropTypes.string,
    onCancel: PropTypes.func,
    onChoose: PropTypes.func,
    onQuery: PropTypes.func,
    onSetOptions: PropTypes.func
  }

  state = {
    ready: false
  }

  autocomplete = null
  geocoder = null

  _handleAutocomplete = this._handleAutocomplete.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleCheck = this._handleCheck.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleGeocode = this._handleGeocode.bind(this)
  _handleInit = this._handleInit.bind(this)
  _handleLoad = this._handleLoad.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { options, q } = this.props
    const { ready } = this.state
    return (
      <ModalPanel { ...this._getPanel() }>
        { ready &&
          <div className="addressfield-chooser">
            <div className="addressfield-chooser-header">
              <Searchbox { ...this._getSearchbox() } />
            </div>
            <div className="addressfield-chooser-body">
              { options.length === 0 && q.length === 0 &&
                <Message { ...this._getMessage() } />
              }
              { options.length === 0 && q.length > 0 &&
                <Message { ...this._getEmpty() } />
              }
              { options.length > 0 &&
                <div className="addressfield-chooser-results">
                  { options.map((option, index) => (
                    <div className="addressfield-chooser-result" key={`options_${index}`} onClick={ this._handleChoose.bind(this, option) }>
                      <div className="addressfield-chooser-result-icon">
                        <i className="fa fa-map-marker" />
                      </div>
                      <div className="addressfield-chooser-result-details">
                        <strong>{ option.structured_formatting.main_text }</strong><br />
                        { option.structured_formatting.secondary_text }
                      </div>
                    </div>
                  )) }
                </div>
              }
            </div>
          </div>
        }
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleLoad()
  }

  componentDidUpdate(prevProps) {
    const { q } = this.props
    if(q !== prevProps.q) {
      if(q.length === 0) this.props.onSetOptions([])
      this.autocomplete.getPlacePredictions({
        input: q
      }, this._handleAutocomplete)
    }
  }

  _getPanel() {
    return {
      title: 'Choose Location',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _getMessage() {
    return {
      title: 'Find a location',
      text: 'Search locations by place or address',
      icon: 'map-marker'
    }
  }

  _getEmpty() {
    return {
      title: 'No locations',
      text: 'No locations matched your search',
      icon: 'times'
    }
  }

  _getSearchbox() {
    const { prompt } = this.props
    return {
      prompt,
      onChange: this._handleType
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _getCounty(result) {
    const component = result.address_components.find(component => {
      return component.long_name.toLowerCase().match(/county/)
    })
    return component ? component.short_name : null
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

  _handleType(q) {
    this.props.onQuery(q)
  }

}

const mapStateToProps = (state, props) => state.maha.addressfield[props.cid]

export default connect(mapStateToProps)(Chooser)
