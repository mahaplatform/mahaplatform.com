import PropTypes from 'prop-types'
import React from 'react'
import Quantity from './quantity'

class Tickets extends React.Component {

  static propTypes = {}

  state = {
    cards: []
  }

  render() {
    return (
      <div className="registration-panel">
        <div className="registration-panel-body">
          <div className="registration-image">
            <img src="https://dev.mahaplatform.com:8080/imagecache/fit=cover&w=350&h=175/assets/8346/10156387003857338.jpg" />
          </div>
          <h1>Test Event</h1>
          <p>Im baby keffiyeh offal yuccie, jianbing meditation umami everyday carry plaid tofu hell of. Direct trade lomo heirloom, tofu vape hoodie sriracha. Polaroid butcher austin swag aesthetic. Skateboard waistcoat small batch man braid fingerstache brunch locavore selfies beard snackwave shabby chic williamsburg. Poke woke meggings chartreuse prism godard succulents organic sriracha chillwave narwhal 90s fixie wolf.</p>
          <table>
            <tr>
              <td>
                General Admission (23 left)<br />
                $50.00
              </td>
              <td>
                <Quantity />
              </td>
            </tr>
          </table>
        </div>
        <div className="registration-panel-footer">
          <div className="ui red button">Next &raquo;</div>
        </div>
      </div>
    )
  }

}

export default Tickets
