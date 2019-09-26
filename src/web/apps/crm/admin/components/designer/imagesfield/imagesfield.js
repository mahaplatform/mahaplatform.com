import { Button, ImageEditor } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Imagesfield extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.array,
    images: PropTypes.array,
    onReady: PropTypes.func,
    onSet: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { images } = this.props
    return (
      <div className="imagesfield">
        { images.map((image, index) => (
          <div className="imagesfield-image" key={`image_${index}`}>
            <div className="imagesfield-image-image">
              <img src="http://localhost:8080/imagecache/fit=cover&w=50&h=50/assets/8117/fairfax-bridge-crop-0.jpg" />
            </div>
            <div className="imagesfield-image-details">
              image<br />
              <Button { ...this._getEdit(image) } />
            </div>
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onSet } = this.props
    if(defaultValue) onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {}

  _getEdit(image) {
    return {
      label: 'edit',
      className: 'link',
      modal: <ImageEditor { ...image } />
    }
  }

}

export default Imagesfield
