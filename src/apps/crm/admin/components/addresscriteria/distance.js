import { NumberField, AddressField } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Distance extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onChange: PropTypes.func
  }

  state = {
    distance: null,
    origin: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDistance = this._handleDistance.bind(this)
  _handleOrigin = this._handleOrigin.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <div className="maha-criterion-form-panel">
        <div className="maha-criterion-field">
          Is within
          <NumberField { ...this._getDistance() } />
        </div>
        <div className="maha-criterion-field">
          of
          <AddressField { ...this._getOrigin() } />
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if(!_.isEqual(this.state, prevState)) {
      this._handleChange()
    }
  }

  _getDistance() {
    return {
      placeholder: 'Enter a number of miles',
      onChange: this._handleDistance
    }
  }

  _getOrigin() {
    return {
      placeholder: 'Enter an address',
      onChange: this._handleOrigin
    }
  }

  _handleDistance(distance) {
    this.setState({ distance })
  }

  _handleOrigin(origin) {
    this.setState({ origin })
  }

  _handleChange() {
    const { distance, origin } = this.state
    if(!distance || !origin) return
    this.props.onChange({
      distance,
      origin: `${origin.latitude},${origin.longitude}`
    }, {
      distance,
      origin,
      text: `${distance} mi from ${origin.description}`
    })
  }

  _handleUpdate() {}

}

export default Distance
