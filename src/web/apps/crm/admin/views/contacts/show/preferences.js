import PropTypes from 'prop-types'
import React from 'react'
import { Image } from 'maha-admin'

const Preferences = ({ contact, preferences }) => (
  <div className="crm-contact-preferences">
    <table className="ui table">
      <tbody>
        { preferences.map((program, i) => [
          <tr key={`header_${i}`}>
            <td className="crm-contact-program">
              <Image src={ program.logo } title={ program.title } transforms={{ w: 24, h: 24 }} />
              { program.title }
            </td>
          </tr>,
          <tr key={`body_${i}`}>
            <td className="crm-contact-consents">
              <strong>Channels</strong><br />
              <ul>
                { program.channels.map((channel, j) => (
                  <li key={`channel_${j}`}>
                    { channel.has_consented ?
                      <i className="fa fa-check-circle" /> :
                      <i className="fa fa-circle-o" />
                    }
                    { channel.label }
                  </li>
                )) }
              </ul>
            </td>
          </tr>,
          <tr key={`body_${i}`}>
            <td className="crm-contact-consents">
              <strong>Interests</strong><br />
              <ul>
                { program.topics.map((topic, index) => (
                  <li key={`topic_${index}`}>
                    { topic.is_interested ?
                      <i className="fa fa-check-circle" /> :
                      <i className="fa fa-circle-o" />
                    }
                    { topic.title }
                  </li>
                )) }
              </ul>
              { program.topics.length === 0 &&
                <p>There are no topics for this program</p>
              }
            </td>
          </tr>
        ]) }
      </tbody>
    </table>
  </div>
)

export default Preferences
