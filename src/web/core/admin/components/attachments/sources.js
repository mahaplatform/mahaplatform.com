import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Sources extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    cancelText: PropTypes.any,
    doneText: PropTypes.string,
    counts: PropTypes.object,
    sources: PropTypes.array,
    onCancel: PropTypes.func,
    onDone: PropTypes.func,
    onChooseSource: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { counts, sources } = this.props
    return (
      <ModalPanel { ...this._getModalPanel() }>
        <div className="maha-attachments-sources">
          { sources.map((source, index) => (
            <div className={ this._getSourceClass(index) } key={`source_${index}`} onClick={ this._handleChooseSource.bind(this, index)}>
              <div className="maha-attachments-source-logo">
                { source.icon ?
                  <i className={`fa fa-fw fa-${source.icon}`} /> :
                  <img src={ `/admin/images/${source.source}.png` } />
                }
              </div>
              <div className="maha-attachments-source-text">
                { source.label }
              </div>
              <div className="maha-attachments-source-count">
                { counts[source.source] &&
                  <div className="maha-attachments-source-count-badge">
                    { counts[source.source] }
                  </div>
                }
              </div>
              <div className="maha-attachments-source-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          ))}
        </div>
      </ModalPanel>
    )
  }

  _getModalPanel() {
    const { cancelText, doneText } = this.props
    return {
      title: 'Choose Source',
      leftItems: [
        { label: cancelText, handler: this._handleCancel }
      ],
      rightItems: [
        { label: doneText, handler: this.props.onDone }
      ]
    }
  }

  _getSourceClass(index) {
    const { active } = this.props
    const classes = ['maha-attachments-source']
    if(index === active) classes.push('active')
    return classes.join(' ')
  }

  _handleChooseSource(index) {
    this.props.onChooseSource(index)
  }

  _handleCancel() {
    this.props.onCancel()
  }

}

export default Sources
