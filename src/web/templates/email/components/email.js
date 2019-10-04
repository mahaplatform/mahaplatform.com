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
    const { config } = this.props
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
                        { config.sections && config.sections.map((section, index) => (
                          <Section key={`section_${index}`} { ...this._getSection(section, index)} />
                        )) }
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

  _getSection(section, index) {
    const { active, onAction } = this.props
    return {
      active,
      config: section,
      sectionIndex: index,
      onAction
    }
  }

}

export default Email
