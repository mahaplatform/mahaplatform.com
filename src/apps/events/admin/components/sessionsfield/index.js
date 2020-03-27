import SessionToken from '../../tokens/session'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'
import _ from 'lodash'

class SessionsField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    sessions: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { sessions } = this.state
    return (
      <div className="sessionsfield">
        <div className="sessionsfield-sessions">
          { sessions.map((session, index) => (
            <div className="sessionsfield-session" key={`session_${index}`}>
              <div className="sessionsfield-session-token">
                <SessionToken { ...session } />
              </div>
              <div className="sessionsfield-session-action">
                <i className="fa fa-pencil" />
              </div>
              <div className="sessionsfield-session-action">
                <i className="fa fa-times" />
              </div>
            </div>
          )) }
        </div>
        <div className="sessionsfield-add">
          <Button { ...this._getAddButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) {
      this.setState({
        sessions: defaultValue
      })
    }
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { sessions } = this.state
    if(!_.isEqual(sessions, prevState.sessions)) {
      this.props.onChange(sessions)
    }
  }

  _getAddButton() {
    return {
      label: 'Add a session',
      className: 'link',
      handler: this._handleNew
    }
  }

  _getNew() {
    return {
      onCancel: this._handleCancel,
      onDone: this._handleAdd
    }
  }

  _handleAdd(session) {
    this.setState({
      sessions: [
        ...this.state.sessions,
        session
      ]
    })
    this.context.form.pop()
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleNew() {
    this.context.form.push(<New { ...this._getNew() } />)
  }

}


export default SessionsField
