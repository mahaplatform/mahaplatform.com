import PropTypes from 'prop-types'
import React from 'react'

class Image extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { image_position, show_caption } = config
    if(show_caption) {
      return (
        <table className="row collapse">
          { image_position === 'bottom' &&
            <tbody>
              <tr>
                { this._getCaptionCell(true, 'first last') }
                <td className="expander"></td>
              </tr>
              <tr>
                { this._getImageCell(true, 'first last') }
                <td className="expander"></td>
              </tr>
            </tbody>
          }
          { image_position === 'top' &&
            <tbody>
              <tr>
                { this._getImageCell(true, 'first last') }
                <td className="expander"></td>
              </tr>
              <tr>
                { this._getCaptionCell(true, 'first last') }
                <td className="expander"></td>
              </tr>
            </tbody>
          }
          { image_position === 'left' &&
            <tbody>
              <tr>
                { this._getImageCell(false, 'first') }
                { this._getCaptionCell(false, 'last') }
                <td className="expander"></td>
              </tr>
            </tbody>
          }
          { image_position === 'right' &&
            <tbody>
              <tr>
                { this._getCaptionCell(false, 'first') }
                { this._getImageCell(false, 'last') }
                <td className="expander"></td>
              </tr>
            </tbody>
          }
        </table>
      )
    }
    return (
      <table className="row collapse">
        <tbody>
          <tr>
            { this._getImageCell(true, 'first last') }
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    )
  }

  _getCaptionCell(vertical, position) {
    const { caption, image_width } = this.props.config
    const width = vertical? 12 : 12 - image_width
    return (
      <td className={`small-${width} large-${width} columns ${position} block-caption`}>
        { caption &&
          <div dangerouslySetInnerHTML={{ __html: caption }} />
        }
      </td>
    )
  }

  _getImageCell(vertical, position) {
    const { image_width, image } = this.props.config
    const width = vertical ? 12 : image_width
    return (
      <td className={`small-${width} large-${width} columns ${position} block-image`}>
        <div>
          { image ?
            <img src={ `/imagecache/w=580&dpi=2&q=100${image}` } /> :
            <img src="https://dummyimage.com/1000x600/606060/ffffff&text=+++IMAGE+++" />
          }
        </div>
      </td>
    )
  }

}

export default Image
