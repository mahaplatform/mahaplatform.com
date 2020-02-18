import PropTypes from 'prop-types'
import Section from './section'
import React from 'react'

class Email extends React.Component {

  static propTypes = {
    active: PropTypes.object,
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
                        <Section { ...this._getSection('header') } />
                        <Section { ...this._getSection('body') } />
                        <Section { ...this._getSection('footer') } />
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

  _getSection(section) {
    const { active, config, onAction } = this.props
    return {
      active,
      section,
      config: {
        blocks: config[section].blocks
      },
      onAction
    }
  }

}

export default Email
