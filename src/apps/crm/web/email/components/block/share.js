import PropTypes from 'prop-types'
import React from 'react'

class Share extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { align, icon_style, icon_color, networks } = config
    if(!networks) return null
    const icons = (
      <table align={ align } className={`menu social float-${align}`}>
        <tbody>
          <tr>
            { networks.map((network, index) => (
              <td key={`network_${index}`} className="social-share-service">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <img width="24" height="24" src={`/admin/images/emails/${icon_style}-${icon_color}-${network.service}-96.png`} />
                      </td>
                      <td className="social-service-label">
                        { network.text }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            )) }
          </tr>
        </tbody>
      </table>
    )
    return align === 'center' ? <center>{ icons }</center> : icons
  }

}

export default Share
