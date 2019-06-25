import PropTypes from 'prop-types'
import React from 'react'

class Mute extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    remind_me_4_weeks: true,
    remind_me_2_weeks: true,
    remind_me_1_week: true
  }

  render() {
    const { remind_me_4_weeks, remind_me_2_weeks, remind_me_1_week } = this.state
    return (
      <div className="maha-preferences">
        <div className="maha-preference" onClick={ this._handleToggle.bind(this, 'remind_me_4_weeks') }>
          <div className="maha-preference-icon">
            { remind_me_4_weeks ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            4 weeks before this plan is due
          </div>
        </div>
        <div className="maha-preference" onClick={ this._handleToggle.bind(this, 'remind_me_2_weeks') }>
          <div className="maha-preference-icon">
            { remind_me_2_weeks ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            2 weeks before this plan is due
          </div>
        </div>
        <div className="maha-preference" onClick={ this._handleToggle.bind(this, 'remind_me_1_week') }>
          <div className="maha-preference-icon">
            { remind_me_1_week ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            1 week before this plan is due
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    const { defaultValue } = this.props
    if(defaultValue) this.setState(defaultValue)
    if(!defaultValue) this.props.onChange(this.state)
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { remind_me_4_weeks, remind_me_2_weeks, remind_me_1_week } = this.state
    if(remind_me_4_weeks !== prevState.remind_me_4_weeks) {
      this.props.onChange(this.state)
    }
    if(remind_me_2_weeks !== prevState.remind_me_2_weeks) {
      this.props.onChange(this.state)
    }
    if(remind_me_1_week !== prevState.remind_me_1_week) {
      this.props.onChange(this.state)
    }
  }

  _handleToggle(key) {
    this.setState({
      [key]: !this.state[key]
    })
  }

}

export default Mute
