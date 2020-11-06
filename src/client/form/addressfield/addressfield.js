import Dependencies from '../../dependencies'
import PropTypes from 'prop-types'
import Lookup from './lookup'
import Manual from './manual'
import React from 'react'
import _ from 'lodash'

class Addressfield extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
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
    onChoose: PropTypes.func,
    onClear: PropTypes.func,
    onQuery: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onSetOptions: PropTypes.func,
    onSetStreet2: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Search for a place or address',
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    mode: 'lookup'
  }

  autocomplete = null
  geocoder = null

  _handleChangeMode = this._handleChangeMode.bind(this)

  render() {
    const { mode } = this.state
    return (
      <div className="maha-addressfield">
        { mode === 'lookup' &&
          <Lookup { ...this._getLookup() } />
        }
        { mode === 'manual' &&
          <Manual { ...this._getManual() } />
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleInit()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value, onChange } = this.props
    if(!_.isEqual(value, prevProps.value)) {
      onChange(value)
    }
  }

  _getLookup() {
    return {
      ...this.props,
      onChangeMode: this._handleChangeMode,
      autocomplete: this.autocomplete,
      geocoder: this.geocoder
    }
  }

  _getManual() {
    return {
      ...this.props
    }
  }

  _handleChangeMode() {
    this.setState({
      mode: 'manual'
    })
  }

  _handleInit() {
    this.autocomplete = new window.google.maps.places.AutocompleteService()
    this.geocoder = new window.google.maps.Geocoder()
    this.props.onReady()
  }

}

const dependencies = {
  scripts: [
    { url: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`, check: 'google.maps' }
  ]
}

Addressfield = Dependencies(dependencies)(Addressfield)

export default Addressfield
