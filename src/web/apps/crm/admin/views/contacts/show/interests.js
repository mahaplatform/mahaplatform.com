import PropTypes from 'prop-types'
import React from 'react'
import { Image } from 'maha-admin'

const Consent = ({ contact, consent }) => (
  <div className="crm-contact-interests">
    <table className="ui unstackable compact table">
      <tbody>
        { consent.map((program, i) => [
          <tr key={`program_${i}`} className="crm-contact-interests-program">
            <td>
              <Image src={ program.logo } title={ program.title } transforms={{ w: 24, h: 24 }} />
              { program.title }
            </td>
          </tr>,
          ...program.topics.map((topic, j) => (
            <tr key={`interests_${j}`} className="crm-contact-interests-topic">
              <td className="collapsing">
                { topic.is_interested ?
                  <i className="fa fa-check-circle" /> :
                  <i className="fa fa-circle-o" />
                } { topic.title }
              </td>
            </tr>
          )),
          ...program.topics.length === 0 ? [(
            <tr key="interests_empty" className="crm-contact-interests-empty">
              <td className="collapsing">
                There are no topics for this program
              </td>
            </tr>
          )] : []
        ]) }
      </tbody>
    </table>
  </div>
)

export default Consent
