import PropTypes from 'prop-types'
import React from 'react'

class Video extends React.Component {

  static propTypes = {
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    sectionIndex: PropTypes.number
  }

  render() {
    const { blockIndex, sectionIndex, config } = this.props
    const { video } = config
    return (
      <table className={`section-${ sectionIndex }-block-${ blockIndex } video-block block`}>
        <tbody>
          <tr>
            <td>
              { video ?
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <img src={ video.image_url } />
                      </td>
                      <td className="expander"></td>
                    </tr>
                    <tr>
                      <td>
                        { video.caption }
                      </td>
                      <td className="expander"></td>
                    </tr>
                  </tbody>
                </table> :
                <table className="placeholder">
                  <tbody>
                    <tr>
                      <td>
                        placeholder
                      </td>
                      <td className="expander"></td>
                    </tr>
                  </tbody>
                </table>
              }
            </td>
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    )
  }

}

export default Video
