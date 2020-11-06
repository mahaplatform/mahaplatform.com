import { AssetViewer, Button, ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Popup from './popup'
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
          { article.desktop_small &&
            <div className="maha-help-article-video desktop">
              <div className="maha-help-article-desktop">
                <AssetViewer asset={ article.desktop_small } />
              </div>
              { article.desktop &&
                <div className="maha-help-article-label">
                  <Button { ...this._getButton() }/>
                </div>
              }
            </div>
          }
          { article.mobile &&
            <div className="maha-help-article-video mobile">
              <div className="maha-help-article-mobile">
                <AssetViewer asset={ article.mobile } />
              </div>
            </div>
          }
          <div className="maha-help-article-body" dangerouslySetInnerHTML={{ __html: article.body }} />
        </div>
      </ModalPanel>
    )
  }

  _getButton() {
    const { article } = this.props
    return {
      label: (
        <span>
          <i className="fa fa-external-link" />watch in popup window
        </span>
      ),
      className: 'link',
      modal: {
        component: <Popup asset={ article.desktop } />,
        options: {
          width: 1024,
          height: 768
        }
      }
    }
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
