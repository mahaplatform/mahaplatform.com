import PropTypes from 'prop-types'
import React from 'react'

class Image extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { video_position, show_caption } = config
    if(show_caption) {
      return (
        <table className="row collapse">
          { video_position === 'bottom' &&
            <tbody>
              <tr>
                { this._getCaptionCell(true, 'first last') }
                <td className="expander"></td>
              </tr>
              <tr>
                { this._getVideoCell(true, 'first last') }
                <td className="expander"></td>
              </tr>
            </tbody>
          }
          { video_position === 'top' &&
            <tbody>
              <tr>
                { this._getVideoCell(true, 'first last') }
                <td className="expander"></td>
              </tr>
              <tr>
                { this._getCaptionCell(true, 'first last') }
                <td className="expander"></td>
              </tr>
            </tbody>
          }
          { video_position === 'left' &&
            <tbody>
              <tr>
                { this._getVideoCell(false, 'first') }
                { this._getCaptionCell(false, 'last') }
                <td className="expander"></td>
              </tr>
            </tbody>
          }
          { video_position === 'right' &&
            <tbody>
              <tr>
                { this._getCaptionCell(false, 'first') }
                { this._getVideoCell(false, 'last') }
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
            { this._getVideoCell(true, 'first last') }
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    )
  }

  _getCaptionCell(vertical, position) {
    const { caption, video_width } = this.props.config
    const width = vertical? 12 : 12 - video_width
    return (
      <td className={`small-${width} large-${width} columns ${position} block-caption`}>
        { caption &&
          <div dangerouslySetInnerHTML={{ __html: caption }} />
        }
      </td>
    )
  }

  _getVideoCell(vertical, position) {
    const { video_width, video } = this.props.config
    const width = vertical ? 12 : video_width
    return (
      <td className={`small-${width} large-${width} columns ${position} block-image`}>
        <div>
          { video ?
            <img src={`/imagecache/w=580&h=317&dpi=2&q=100&overlay=video${video.preview}` } /> :
            <img src="https://dummyimage.com/1160x634/606060/ffffff&text=+++VIDEO+++" />
          }
        </div>
      </td>
    )
  }

}

export default Image
