import PropTypes from 'prop-types'
import React from 'react'

class Follow extends React.Component {

  static propTypes = {
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    sectionIndex: PropTypes.number
  }

  render() {
    const { config } = this.props
    const { align, icon_style, icon_color, networks } = config
    if(!networks) return null
    const icons = (
      <table align={ align } className={`menu social float-${align} follow-block block`}>
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
    return align === 'center' ? <center>{ icons }</center> : icons
  }

}

export default Follow
