import { ModalPanel } from '@admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

class Profiles extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    profiles: PropTypes.array,
    onChoose: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleNew = this._handleNew.bind(this)

  render() {
    const { profiles } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="profilefield-picker-profiles">
          { profiles.map((profile, index) => (
            <div className="profilefield-picker-profile" key={`source_${index}`} onClick={ this._handleChoose.bind(this, index) }>
              <div className="profilefield-picker-profile-logo">
                <img src={`/images/services/${profile.service}.png`} />
              </div>
              <div className="profilefield-picker-profile-username">
                { profile.username }
              </div>
            </div>
          ))}
          <div className="profilefield-picker-profile-add" onClick={ this._handleNew }>
            <div className="profilefield-picker-profile-add-icon">
              <i className="fa fa-plus-circle" />
            </div>
            <div className="profilefield-picker-profile-add-label">
              Add Profile
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getNew() {
    return {
    }
  }

  _getPanel() {
    return {
      title: 'Profiles',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.context.form.pop()
  }

  _handleChoose(index) {
    this.props.onChoose(index)
    this.context.form.pop()
  }

  _handleNew() {
    this.context.form.push(New, this._getNew.bind(this))
  }
}

const mapStateToProps = (state, props) => ({
  profiles: state.maha.profilefield[props.cid].profiles
})

export default connect(mapStateToProps)(Profiles)
