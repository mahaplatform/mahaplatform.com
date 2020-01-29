import PropTypes from 'prop-types'
import React from 'react'

class Divider extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    return (
      <table className="row collapse">
        <tbody>
          <tr>
            <td className="large-12 first last columns">
              <div className="divider" />
            </td>
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    )
  }

}

export default Divider
