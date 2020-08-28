import { Dependencies, Button, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Map extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    center: PropTypes.object,
    polygon: PropTypes.array,
    zoom: PropTypes.number,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  element = null
  map = null
  path = null

  state = {
    polygon: null,
    center: null,
    zoom: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleCenter = this._handleCenter.bind(this)
  _handleComplete = this._handleComplete.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleInit = this._handleInit.bind(this)
  _handleReset = this._handleReset.bind(this)
  _handleZoom = this._handleZoom.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-mappolygon-map">
          <div { ...this._getMap() } />
          <div className="crm-mappolygon-map-button">
            <Button { ...this._getButton() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { center, polygon, zoom } = this.props
    this.setState({ center, polygon, zoom }, this._handleInit)
  }

  _getButton() {
    return {
      label: 'Reset Polygon',
      color: 'blue',
      handler: this._handleReset
    }
  }

  _getMap() {
    return {
      ref: node => this.element = node,
      className: 'crm-mappolygon-map-canvas'
    }
  }

  _getPanel() {
    const { polygon } = this.state
    return {
      title: 'Map',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: polygon ? [
        { label: 'Done', handler: this._handleDone }
      ] : null
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleCenter() {
    const center = this.map.getCenter()
    this.setState({
      center: {
        lat: center.lat(),
        lng: center.lng()
      }
    })
  }

  _handleComplete(polygon) {
    if(this.polygon) this.polygon.setMap(null)
    this.polygon = polygon
    const path = polygon.getPath()
    const points = new Array(path.getLength()).fill(0).map((i, index) => {
      return path.getAt(index).toUrlValue(6)
    })
    this.setState({
      polygon: [
        ...points,
        points[0]
      ]
    })
  }

  _handleDone() {
    const { center, polygon, zoom } = this.state
    this.props.onDone({
      center,
      polygon,
      zoom
    })
    this.context.modal.close()
  }

  _handleInit() {
    const { center, polygon, zoom } = this.state
    const { maps } = window.google
    this.map = new maps.Map(this.element, {
      disableDefaultUI: true,
      scaleControl: true,
      zoomControl: true,
      center,
      zoom
    })
    this.map.addListener('zoom_changed', this._handleZoom)
    this.map.addListener('center_changed', this._handleCenter)
    const drawingManager = new maps.drawing.DrawingManager({
      drawingMode: maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      polygonOptions: {
        strokeColor: '0x000000',
        fillColor: '0x00000033',
        strokeWeight: 3,
        clickable: false,
        editable: false,
        zIndex: 1
      }
    })
    maps.event.addListener(drawingManager, 'polygoncomplete', this._handleComplete)
    drawingManager.setMap(this.map)
    if(polygon) {
      this.polygon = new maps.Polygon({
        paths: polygon.map(coord => {
          return coord.split(',')
        }).map(coord => ({
          lat: Number(coord[0]),
          lng: Number(coord[1])
        })),
        strokeColor: '0x000000',
        fillColor: '0x00000033',
        strokeWeight: 3
      })
      this.polygon.setMap(this.map)
    }
  }

  _handleReset() {
    if(this.polygon) this.polygon.setMap(null)
  }

  _handleZoom() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }

}

const dependencies = {
  scripts: [
    `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=drawing`
  ]
}

Map = Dependencies(dependencies)(Map)

export default Map
