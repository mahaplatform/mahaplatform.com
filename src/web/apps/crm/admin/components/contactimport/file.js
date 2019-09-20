import { Attachments } from 'maha-admin'
import Configure from './configure'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class File extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    source: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  _handleNext = this._handleNext.bind(this)

  render() {
    return <Attachments { ...this._getAttachments() } />
  }

  _getAttachments() {
    const { onPop } = this.props
    return {
      allow: {
        content_types: ['application/vnd.google-apps.spreadsheet'],
        extensions: ['csv','tsv','xls','xlsx'],
        types: ['files']
      },
      cancelText: <i className="fa fa-chevron-left" />,
      onCancel: onPop,
      doneText: 'Next',
      onDone: this._handleNext
    }
  }

  _getConfigure() {
    const { onPop, onPush } = this.props
    return {
      onPop,
      onPush
    }
  }

  _handleNext() {
    this.props.onPush(Configure, this._getConfigure())
  }

}

export default File
