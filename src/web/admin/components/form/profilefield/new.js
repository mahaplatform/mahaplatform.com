import { ModalPanel } from 'maha-admin'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

const sources = [
  { label: 'Facebook', service: 'facebook' },
  { label: 'Instagram', service: 'instagram' },
  { label: 'Twitter', service: 'twitter' }
]

class New extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object,
    host: PropTypes.object
  }

  static propTypes = {
    token: PropTypes.string,
    onPop: PropTypes.func
  }

  static defaultProps = {}

  _handleBack = this._handleBack.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="contactimport-sources">
          { sources.map((source, index) => (
            <div className="contactimport-source" key={`source_${index}`} onClick={ this._handleChooseSource.bind(this, source)}>
              <div className="contactimport-source-service">
                <img src={ `/admin/images/services/${source.service}.png` } />
              </div>
              <div className="contactimport-source-label">
                { source.label }
              </div>
            </div>
          ))}
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose Service',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChooseSource(source) {
    const { token } = this.props
    const timestamp = moment().format('x')
    this.context.host.openWindow(`/admin/${source.service}/authorize?type=posts&timestamp=${timestamp}&token=${token}`)
    this.context.form.pop()
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(New)
