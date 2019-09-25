import ModalPanel from '../../modal_panel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Caman from '../caman'
import React from 'react'
import _ from 'lodash'

const filters = [
  { label: 'Original', name: 'original'},
  { label: 'Vintage', name: 'vintage' },
  { label: 'Lomo', name: 'lomo' },
  { label: 'Clarity', name: 'clarity' },
  { label: 'Sin City', name: 'sinCity' },
  { label: 'Sunrise', name: 'sunrise' },
  { label: 'Cross Process', name: 'crossProcess' },
  { label: 'Orange Peel', name: 'orangePeel' },
  { label: 'Love', name: 'love' },
  { label: 'Jarques', name: 'jarques' },
  { label: 'Pinhole', name: 'pinhole' },
  { label: 'Old Boot', name: 'oldBoot' },
  { label: 'Glowing Sun', name: 'glowingSun' },
  { label: 'Hazy Days', name: 'hazyDays' },
  { label: 'Her Majesty', name: 'herMajesty' },
  { label: 'Nostalgia', name: 'nostalgia' },
  { label: 'Hemingway', name: 'hemingway' },
  { label: 'Concentrate', name: 'concentrate' }
]

class Filters extends React.PureComponent {

  static propTypes = {
    asset: PropTypes.object,
    transforms: PropTypes.object,
    onAdjust: PropTypes.func,
    onBack: PropTypes.func
  }

  previews = []

  _handleBack = this._handleBack.bind(this)

  render() {
    const { asset } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor-filters">
          <div className="maha-imageeditor-grid">
            { _.chunk(filters, 2).map((chunk, i) => (
              <div className="maha-imageeditor-row" key={`chunk_${i}`}>
                { chunk.map((filter, j) => (
                  <div className="maha-imageeditor-column" key={`filter_${j}`}>
                    <div className={ this._getClass(filter) } onClick={ this._handleClick.bind(this, filter.name) }>
                      <img src={`/imagecache/w=125${asset.path}`} ref={ node => this.previews[filter.name] = node } />
                      { filter.label}
                    </div>
                  </div>
                )) }
              </div>
            )) }
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    filters.map(filter => {
      if(filter.name === 'original') return
      Caman(this.previews[filter.name], function() {
        this[filter.name]().render()
      })
    })
  }

  _getClass(filter) {
    const { transforms } = this.props
    const classes = ['maha-imageeditor-button']
    if(transforms.filter === filter.name) classes.push('active')
    if(!transforms.filter && filter.name === 'original') classes.push('active')
    return classes.join(' ')
  }

  _getPanel() {
    return {
      title: 'Filters',
      color: 'grey',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleClick(name) {
    const value = name !== 'original' ? name : null
    this.props.onAdjust('filter', value)
  }

}

const mapStateToProps = (state, props) => ({
  asset: state.maha.image_editor.asset,
  transforms: state.maha.image_editor.transforms
})

export default connect(mapStateToProps)(Filters)
