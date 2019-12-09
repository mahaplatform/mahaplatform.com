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
    const { blockIndex, sectionIndex } = this.props
    const rows = this._getRows()
    return (
      <table className={`row section-${ sectionIndex }-block-${ blockIndex } image-block block`}>
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

  _getRows() {
    const { config } = this.props
    const { images, layout } = config
    return images.reduce((rows, image, index) => {
      const total = rows.reduce((sum, row) => sum + row.length, 0)
      return total < images.length ? [
        ...rows,
        layout[index % layout.length] === 2 ? [
          images[total],
          images[total + 1]
        ] : [
          images[total]
        ]
      ] : rows
    }, [])
  }

  _getUrl({ asset, transforms }) {
    const args = transforms ? Object.keys(transforms).reduce((args, key) => {
      if(key === 'crop') {
        const crop = transforms[key]
        return {
          ...args,
          crop: { w: crop.w, h: crop.h, x: crop.x, y: crop.y }
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
    return `/caman${querystring}${asset.path}`
  }

}

export default Images
