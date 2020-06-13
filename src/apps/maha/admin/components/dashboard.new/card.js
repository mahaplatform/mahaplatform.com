import PropTypes from 'prop-types'
import { Logo } from 'maha-admin'
import React from 'react'

class Card extends React.Component {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    card: PropTypes.object
  }

  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { card } = this.props
    return (
      <div className="maha-dashboard-card-container">
        <div className="maha-dashboard-card">
          <div className="maha-dashboard-card-header">
            <div className="maha-dashboard-card-header-avatar">
              <Logo team={{ title: 'Primitive Pursuits', logo: '/assets/9331/primitivepursuits.jpg' }} />
            </div>
            <div className="maha-dashboard-card-header-label">
              <strong>{ card.title }</strong><br />
              { card.type.title }
            </div>
            <div className="maha-dashboard-card-header-icon" onClick={ this._handleTasks }>
              <i className="fa fa-ellipsis-v" />
            </div>
          </div>
          <div className="maha-dashboard-card-body">
            <table className="ui unstackable compact table">
              <tbody>
                <tr>
                  <td>
                    <div className="link">Key</div>
                  </td>
                  <td className="right aligned">14/50</td>
                </tr>
                <tr>
                  <td>
                    <div className="link">Key</div>
                  </td>
                  <td className="right aligned">1/30</td>
                </tr>
                <tr>
                  <td>
                    <div className="link">Key</div>
                  </td>
                  <td className="right aligned">14/50</td>
                </tr>
                <tr>
                  <td>
                    <div className="link">Key</div>
                  </td>
                  <td className="right aligned">1/30</td>
                </tr>
                <tr>
                  <td>
                    <div className="link">Key</div>
                  </td>
                  <td className="right aligned">14/50</td>
                </tr>
                <tr>
                  <td>
                    <div className="link">Key</div>
                  </td>
                  <td className="right aligned">1/30</td>
                </tr>
                <tr>
                  <td>
                    <div className="link">Key</div>
                  </td>
                  <td className="right aligned">14/50</td>
                </tr>
                <tr>
                  <td>
                    <div className="link">Key</div>
                  </td>
                  <td className="right aligned">1/30</td>
                </tr>
                <tr>
                  <td>
                    <div className="link">Key</div>
                  </td>
                  <td className="right aligned">14/50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  _handleTasks() {
    this.context.tasks.open({
      items: [
        { label: 'Edit Card' },
        { label: 'Remove Card' }
      ]
    })
  }

}

export default Card
