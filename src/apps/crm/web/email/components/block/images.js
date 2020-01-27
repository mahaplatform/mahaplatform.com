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
    const { images, layout } = config
    if(!images || !layout) return null
    let k = -1
    return (
      <table className={`row section-${ sectionIndex }-block-${ blockIndex } images-block block`}>
        <tbody>
          <tr>
            <td>
              { layout.map((row, i) => (
                <table className="row collapse" key={`images_${i}`}>
                  <tbody>
                    <tr>
                      { row.map((image, j) => {
                        k += 1
                        return (
                          <td className={this._getClass(row.length, k)} key={`image_${j}`}>
                            <img src={ this._getUrl(images[k], row.length) } />
                          </td>
                        )
                      }) }
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

  _getClass(columns, index) {
    const classes = ['image','small-12',`large-${12 / columns}`,'columns']
    if(index === 0) classes.push('first')
    if(index === columns - 1) classes.push('last')
    return classes.join(' ')
  }

  _getUrl({ asset }, items) {
    const w = items === 2 ? 300 : 600
    return `/imagecache/w=${w}/${asset.path}`
  }

}

export default Images
