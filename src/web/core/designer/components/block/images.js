import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'

class Images extends React.Component {

  static propTypes = {
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    sectionIndex: PropTypes.number
  }

  render() {
    const { blockIndex, config, sectionIndex } = this.props
    const rows = this._getFormated(config.images, [1,2])
    return (
      <table className={`row section-${ sectionIndex }-block-${ blockIndex }`}>
        <tbody>
          <tr>
            <td>
              { rows.map((row, i) => (
                <table className="row" key={`images_${i}`}>
                  <tbody>
                    <tr>
                      { row.map((image, j) => (
                        <td key={`image_${j}`}>
                          <img src={ this._getUrl(image) } />
                        </td>
                      )) }
                      <td className="expander"></td>
                    </tr>
                  </tbody>
                </table>
              )) }
            </td>
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    )
  }

  _getFormated(images, format) {
    return images.reduce((rows, image, index) => {
      const total = rows.reduce((sum, row) => sum + row.length, 0)
      return total < images.length ? [
        ...rows,
        format[index % format.length] === 2 ? [
          images[total],
          images[total + 1]
        ] : [
          images[total]
        ]
      ] : rows
    }, [])
  }

  _getUrl({ asset_id, transforms }) {
    const args = transforms ? Object.keys(transforms).reduce((args, key) => {
      if(key === 'crop') {
        const crop = transforms[key]
        return {
          ...args,
          crop: [crop.w, crop.h, crop.x, crop.y]
        }
      } else if(key === 'invert') {
        return {
          ...args,
          invert: true
        }
      } else {
        return {
          ...args,
          [key]: transforms[key]
        }
      }
    }, {}) : {}
    const querystring = Object.keys(args).length > 0 ? `/${qs.stringify(args)}` : ''
    return `/caman${querystring}/assets/8117/fairfax-bridge-crop-0.jpg`
  }

}

export default Images
