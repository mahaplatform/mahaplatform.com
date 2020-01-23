import PropTypes from 'prop-types'
import React from 'react'

class Images extends React.Component {

  static propTypes = {
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    sectionIndex: PropTypes.number
  }

  render() {
    const { blockIndex, config, sectionIndex } = this.props
    const { images} = config
    if(!images) return null
    const rows = this._getRows()
    return (
      <table className={`row section-${ sectionIndex }-block-${ blockIndex } images-block block`}>
        <tbody>
          <tr>
            <td>
              { rows.map((row, i) => (
                <table className="row" key={`images_${i}`}>
                  <tbody>
                    <tr>
                      { row.map((image, j) => (
                        <td className="image" key={`image_${j}`}>
                          <img src={ this._getUrl(image, row.length) } />
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

  _getUrl({ asset }, items) {
    const w = items === 2 ? 300 : 600
    return `/imagecache/w=${w}/${asset.path}`
  }

}

export default Images
