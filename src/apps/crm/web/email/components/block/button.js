import PropTypes from 'prop-types'
import React from 'react'

class Button extends React.Component {

  static propTypes = {
    blockIndex: PropTypes.number,
    config: PropTypes.object,
    sectionIndex: PropTypes.number
  }

  render() {
    const { blockIndex, sectionIndex, config } = this.props
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
      <table className={`row collapse section-${ sectionIndex }-block-${ blockIndex } button-block block`}>
        <tbody>
          <tr>
            <td className="large-12 first last columns">
              { align === 'center' ?<center>{ button }</center> : button }
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

}

export default Button
