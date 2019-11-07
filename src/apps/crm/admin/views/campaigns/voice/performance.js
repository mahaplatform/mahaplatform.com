import React from 'react'

const Performance = () => {

  return (
    <div className="crm-report">
      <div className="crm-report-title">
        Enrollments
      </div>
      <div className="crm-report-table">
        <table className="ui table">
          <tbody>
            <tr>
              <td>Calls</td>
              <td className="right aligned">
                100
              </td>
            </tr>
            <tr>
              <td>Hangups</td>
              <td className="right aligned">
                32
              </td>
            </tr>
            <tr>
              <td>Completions</td>
              <td className="right aligned">
                68
              </td>
            </tr>
            <tr>
              <td>Conversions</td>
              <td className="right aligned">
                91
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )

}

Performance.propTypes = {}

export default Performance
