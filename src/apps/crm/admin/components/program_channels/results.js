import ContactToken from '../../tokens/contact'
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
      <div className="crm-program-channels-channels">
        { records.map((channel, index) => (
          <div className={ this._getClass(channel) } key={`channel_${index}`} onClick={ this._handleChoose.bind(this, channel) }>
            <div className="crm-program-channels-channel-token">
              <ContactToken { ...channel.contact } />
            </div>
            { channel.unread > 0 &&
              <div className="crm-program-channels-channel-unread">
                <div className="crm-program-channels-channel-unread-count">
                  { channel.unread }
                </div>
              </div>
            }
          </div>
        ))}
      </div>
    )
  }

  _getClass(channel) {
    const { selected } = this.state
    const classes = ['crm-program-channels-channel']
    if(channel.id === selected) classes.push('selected')
    return classes.join(' ')
  }


  _getSearchbox() {
    return {}
  }

  _handleChoose(channel) {
    this.setState({
      selected: channel.id
    })
    this.props.onChoose(channel)
  }

}

export default Results
