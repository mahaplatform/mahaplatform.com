import PropTypes from 'prop-types'
import React from 'react'

class Images extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { images, layout } = config
    if(!images || !layout) return null
    let k = -1
    return layout.map((row, i) => (
      <table className="row collapse" key={`images_${i}`}>
        <tbody>
          <tr>
            { row.map((image, j) => {
              k += 1
              return (
                <td className={this._getClass(row.length, k)} key={`image_${j}`}>
                  <img src={ `/imagecache/w=600/${images[k].asset.path}` } />
                </td>
              )
            }) }
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    ))
  }

  _getClass(columns, index) {
    const classes = ['image','small-12',`large-${12 / columns}`,'columns']
    if(index === 0) classes.push('first')
    if(index === columns - 1) classes.push('last')
    return classes.join(' ')
  }

}

export default Images
