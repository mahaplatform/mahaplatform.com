import PropTypes from 'prop-types'
import React from 'react'

class Image extends React.Component {

  static propTypes = {
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    sectionIndex: PropTypes.number
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
    return (
      <td className={`small-12 large-${vertical? 12 : 12 - video_width} columns ${position} block-caption`}>
        { caption &&
          <div dangerouslySetInnerHTML={{ __html: caption }} />
        }
      </td>
    )
  }

  _getVideoCell(vertical, position) {
    const { video_width, video } = this.props.config
    return (
      <td className={`small-12 large-${vertical ? 12 : video_width} columns ${position}`}>
        { video ?
          <img src={ `${video.preview}` } /> :
          <img src="https://dummyimage.com/1000x600/666666/ffffff&text=Choose+Video" />
        }
      </td>
    )
  }

}

export default Image
