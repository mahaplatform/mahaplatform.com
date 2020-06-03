import ContactToken from '../../../tokens/contact'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-phone-contacts-results">
        { records.map((channel, index) => (
          <div className="maha-phone-contacts-result" key={`channel_${index}`} onClick={ this._handleChoose.bind(this, channel) }>
            <div className="maha-phone-contacts-result-token">
              <ContactToken { ...channel.contact } />
            </div>
            { channel.unread > 0 &&
              <div className="maha-phone-contacts-result-unread">
                <div className="crm-program-channels-channel-unread-count">
                  { channel.unread }
                </div>
              </div>
            }
            <div className="maha-phone-contacts-result-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(channel) {
    const { selected } = this.state
    const classes = ['']
    if(channel.id === selected) classes.push('selected')
    return classes.join(' ')
  }

  _handleChoose(channel) {
    this.props.onChoose(channel)
  }

}

export default Results
