import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Map from './map'
import _ from 'lodash'

class MapCriteria extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    onChange: PropTypes.func
  }

  state = {
    center: {
      lat: 42.758154,
      lng: -76.088137
    },
    polygon: null,
    zoom: 7
  }

  _handleChange = this._handleChange.bind(this)
  _handleMap = this._handleMap.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <div className="crm-mappolygon">
        <div className="crm-mappolygon-preview">
          <div className="crm-mappolygon-preview-image">
            <img src={ this._getSrc()} />
          </div>
          <div className="crm-mappolygon-preview-button">
            <Button { ...this._getButton() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if(!_.isEqual(this.state, prevState)) {
      this._handleChange()
    }
  }

  _getButton() {
    return {
      label: 'Draw Polygon',
      color: 'grey',
      handler: this._handleMap
    }
  }

  _getMap() {
    const { center, polygon, zoom } = this.state
    return {
      center,
      polygon,
      zoom,
      onDone: this._handleUpdate
    }
  }

  _getSrc() {
    const { center, polygon, zoom } = this.state
    const args = ['size=300x225','type=roadmap',`key=${process.env.GOOGLE_MAPS_API_KEY}`]
    args.push(`center=${center.lat},${center.lng}`)
    args.push(`zoom=${zoom - 1}`)
    if(polygon) {
      const path = ['color:0x000000','fillcolor:0x00000033','weight:2',...polygon]
      args.push(`path=${path.join('|')}`)
    }
    return `https://maps.googleapis.com/maps/api/staticmap?${args.join('&')}`
  }

  _handleChange() {
    const { center, polygon, zoom } = this.state
    this.props.onChange(polygon, {
      center,
      zoom
    })
  }

  _handleMap() {
    this.context.modal.open(<Map { ...this._getMap() } />)
  }

  _handleUpdate({ center, polygon, zoom }) {
    this.setState({
      center,
      polygon,
      zoom
    })
  }

}

export default MapCriteria
