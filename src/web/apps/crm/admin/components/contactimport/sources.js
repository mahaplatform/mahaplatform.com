import { Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Sources extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    sources: PropTypes.array,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { sources } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="contactimport-sources-header">
          <Message { ...this._getOverview() } />
        </div>
        <div className="contactimport-sources-body">
          { sources.map((source, index) => (
            <div className="contactimport-source" key={`source_${index}`} onClick={ this._handleClick.bind(this, source) }>
              <div className="contactimport-source-service">
                { source.service &&
                  <img src={`/images/services/${source.service}.png`} className={source.service} />
                }
                { source.icon &&
                  <i className={`fa fa-${source.icon}`} />
                }
              </div>
              <div className="contactimport-source-label">
                { source.label || source.username }
              </div>
              <div className="contactimport-source-proceed">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
          ))}
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

  _getOverview() {
    return {
      backgroundColor: 'red',
      icon: 'download',
      title: 'Choose Source',
      text: 'We support a many strategies for importing contacts wherever you keep them.'
    }
  }

  _getPanel() {
    return {
      title: 'Import Contacts',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ]
    }
  }

  _getSource(source) {
    const { onPop, onPush } = this.props
    return {
      source,
      onPop,
      onPush
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleClick(source) {
    this.props.onPush(source.component, this._getSource(source))
  }


}

export default Sources
