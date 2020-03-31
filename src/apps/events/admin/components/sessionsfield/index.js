import SessionToken from '../../tokens/session'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'
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
  _handleBack = this._handleBack.bind(this)
  _handleEdit = this._handleEdit.bind(this)
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
              <div className="sessionsfield-session-action" onClick={ this._handleEdit.bind(this, session, index )}>
                <i className="fa fa-pencil" />
              </div>
              <div className="sessionsfield-session-action" onClick={ this._handleRemove.bind(this, index )}>
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
      this._handleChange()
    }
  }

  _getAddButton() {
    return {
      label: 'Add a session',
      className: 'link',
      handler: this._handleNew
    }
  }

  _getEdit(session, index) {
    return {
      session,
      onBack: this._handleBack,
      onDone: this._handleUpdate.bind(this, index)
    }
  }

  _getNew() {
    return {
      onBack: this._handleBack,
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

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange() {
    const { sessions } = this.state
    const value = sessions.map(session => ({
      ..._.omit(session, ['location']),
      location_id: session.location ? session.location.id : null
    }))
    this.props.onChange(value)
  }

  _handleEdit(session, index) {
    this.context.form.push(<Edit { ...this._getEdit(session, index) } />)
  }

  _handleNew() {
    this.context.form.push(<New { ...this._getNew() } />)
  }

  _handleRemove(index) {
    this.setState({
      sessions: [
        ...this.state.sessions.filter((session, i) => {
          return i !== index
        })
      ]
    })
  }

  _handleUpdate(index, newsession) {
    this.setState({
      sessions: [
        ...this.state.sessions.map((session, i) => {
          return i === index ? newsession : session
        })
      ]
    })
    this.context.form.pop()
  }

}


export default SessionsField
