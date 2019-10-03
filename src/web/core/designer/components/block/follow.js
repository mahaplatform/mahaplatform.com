import PropTypes from 'prop-types'
import React from 'react'

class Follow extends React.Component {

  static propTypes = {
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    sectionIndex: PropTypes.number
  }

  render() {
    const { blockIndex, sectionIndex, config } = this.props
    const { align, icon_style, icon_color, networks } = config
    const icons = (
      <table align={ align } className={`menu social float-${align}`}>
        <tbody>
          <tr>
            { networks.map((network, index) => (
              <td key={`network_${index}`} className="social-service">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <img width="24" height="24" src={`/images/emails/${icon_style}-${icon_color}-${network.service}-96.png`} />
                      </td>
                      <td className="expander"></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            )) }
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    )
    return (
      <table className={`row section-${ sectionIndex }-block-${ blockIndex }`}>
        <tbody>
          <tr>
            <td className="small-12 large-12 columns first last">
              { align === 'center' ?<center>{ icons}</center> : icons }
            </td>
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>

    )
  }

}

export default Follow
