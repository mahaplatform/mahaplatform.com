import PropTypes from 'prop-types'
import { Image } from 'maha-admin'
import React from 'react'

const Interests = ({ contact, interests }) => (
  <div className="crm-contact-interests">
    <table className="ui unstackable compact table">
      <tbody>
        { interests.filter(program => {
          return program.topics.length > 0
        }).map((program, i) => [
          <tr key={`program_${i}`} className="crm-contact-interests-program">
            <td colSpan="2">
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
                }
              </td>
              <td>{ topic.title }</td>
            </tr>
          ))
        ]) }
      </tbody>
    </table>
  </div>
)

Interests.propTypes = {
  contact: PropTypes.object,
  interests: PropTypes.array
}

export default Interests
