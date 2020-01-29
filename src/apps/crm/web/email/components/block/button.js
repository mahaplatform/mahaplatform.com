import PropTypes from 'prop-types'
import React from 'react'

class Button extends React.Component {

  static propTypes = {
    config: PropTypes.object
  }

  render() {
    const { config } = this.props
    const { align, content, display } = config
    const button = (
      <table align={ align } className={`button${display === 'block' ? ' expanded' : '' } float-${align}`}>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      { content }
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    )
    return (
      <table className="row collapse">
        <tbody>
          <tr>
            <td className="large-12 first last columns">
              { align === 'center' ?<center>{ button }</center> : button }
            </td>
            <td className="expander"></td>
          </tr>
        </tbody>
      </table>
    )
  }

}

export default Button
