import PropTypes from 'prop-types'
import { List } from 'maha-admin'
import Chart from './chart'
import React from 'react'

const Results = () => {

  const list = {
    sections: [
      {
        title: 'Delivery',
        items: [
          {
            component: <Chart />
          }, {
            component: (
              <table className="ui table">
                <tbody>
                  <tr>
                    <td>Calls</td>
                    <td className="right aligned">
                      100
                    </td>
                  </tr>
                  <tr>
                    <td>Conversions</td>
                    <td className="right aligned">
                      52
                    </td>
                  </tr>
                  <tr>
                    <td>Hangups</td>
                    <td className="right aligned">
                      50
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          }

        ]
      }
    ]
  }

  return <List { ...list } />

}

Results.propTypes = {}

export default Results
