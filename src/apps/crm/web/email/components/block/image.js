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
    const { image_position } = config
    return (
      <table className={`row section-${ sectionIndex }-block-${ blockIndex } image-block block`}>
        <tbody>
          <tr>
            <td>
              <table className="row">
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
            </td>
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    )
  }

  _getCaptionCell(vertical, position) {
    const { caption, image_width } = this.props.config
    return (
      <td className={`small-12 large-${vertical? 12 : 12 - image_width} columns ${position}`}>
        { caption &&
          <div dangerouslySetInnerHTML={{ __html: caption }} />
        }
      </td>
    )
  }

  _getImageCell(vertical, position) {
    const { image_width, image } = this.props.config
    return (
      <td className={`small-12 large-${vertical ? 12 : image_width} columns ${position}`}>
        { image ?
          <img src={ `/imagecache/${image}` } /> :
          <img src="https://dummyimage.com/1000x600/666666/ffffff&text=Choose+Image" />
        }
      </td>
    )
  }

}

export default Images
