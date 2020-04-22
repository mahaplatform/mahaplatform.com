import { AssetViewer, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Help extends React.Component {

  static propTypes = {
    article: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)

  render() {
    const { article } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-help-article">
          <h1>{ article.title }</h1>
          { article.desktop &&
            <div className="maha-help-article-video desktop">
              <div className="maha-help-article-desktop">
                <AssetViewer asset={ article.desktop } />
              </div>
            </div>
          }
          { article.mobile &&
            <div className="maha-help-article-video mobile">
              <div className="maha-help-article-mobile">
                <AssetViewer asset={ article.mobile } />
              </div>
            </div>
          }
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      color: 'green',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ]
    }
  }

  _handleCancel() {
    this.props.onDone()
  }

}

export default Help
