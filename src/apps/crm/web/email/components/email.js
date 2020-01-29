import PropTypes from 'prop-types'
import Section from './section'
import React from 'react'

class Email extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    config: PropTypes.object,
    children: PropTypes.any,
    onAction: PropTypes.func
  }

  render() {
    return (
      <table className="body" id="body">
        <tbody>
          <tr>
            <td className="float-center" align="center" valign="top">
              <center>
                <table className="container">
                  <tbody>
                    <tr>
                      <td>
                        <Section { ...this._getSection()} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  _getSection() {
    const { active, config, onAction } = this.props
    return {
      active,
      config: {
        blocks: config.blocks
      },
      onAction
    }
  }

}

export default Email
