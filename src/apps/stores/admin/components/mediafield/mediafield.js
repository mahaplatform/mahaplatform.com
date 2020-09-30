import { Attachments, Button } from 'maha-admin'
import PropTypes from 'prop-types'
import Image from './image'
import React from 'react'
import _ from 'lodash'

class MediaField extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.array,
    images: PropTypes.array,
    status: PropTypes.string,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onMove: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSet = this._handleSet.bind(this)
  _handleFetch = this._handleFetch.bind(this)

  render() {
    const { images, status } = this.props
    if(status !== 'ready') return null
    return (
      <div className="mediafield">
        { images.map((image, index) => (
          <Image { ...this._getImage(image, index) } key={`image_${index}`} />
        )) }
        <Button { ...this._getAdd() } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    const images = defaultValue || []
    this._handleSet(images)
  }

  componentDidUpdate(prevProps) {
    const { images, status } = this.props
    if(status !== prevProps.status) {
      if(status === 'initialized') {
        this._handleFetch()
      }
      if(status === 'ready') {
        this.props.onReady()
      }
    }
    if(!_.isEqual(images, prevProps.images)) {
      this._handleChange()
    }
  }

  _getAdd() {
    return {
      label: '+ Add Photo(s)',
      className: 'mediafield-add',
      modal: <Attachments { ...this._getAttachments() } />
    }
  }

  _getAttachments() {
    return {
      multiple: true,
      type: 'photos',
      onChooseAssets: this._handleAdd
    }
  }

  _getImage(image, index) {
    const { onMove, onRemove } = this.props
    return {
      image,
      index,
      onMove,
      onRemove
    }
  }

  _handleAdd(assets) {
    this.props.onAdd(assets)
  }

  _handleChange() {
    const { images } = this.props
    this.props.onChange(images.map(image => ({
      id: image.id,
      path: image.path
    })))
  }

  _handleFetch() {
    const { images } = this.props
    this.props.onFetch(images.map(image => {
      return image.id
    }))
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handleSet(images) {
    const { onSet } = this.props
    return onSet(images.map(image => ({
      id: image.id
    })))
  }

}

export default MediaField
