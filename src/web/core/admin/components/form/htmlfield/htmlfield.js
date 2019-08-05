import { CompositeDecorator, Editor, EditorState, RichUtils } from 'draft-js'
import { convertFromHTML, convertToHTML } from 'draft-convert'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'

import { linkStrategy, Link } from './link'

class htmlfield extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: '',
    onChange: (value) => {},
    onReady: () => {}
  }

  state = {
    editorState: null,
    linking: false,
    url: null,
    view: 'text',
    code: ''
  }

  _handleBeginLink = this._handleBeginLink.bind(this)
  _handleCodeToggle = this._handleCodeToggle.bind(this)
  _handleEndLink = this._handleEndLink.bind(this)
  _handleTextareaChange = this._handleTextareaChange.bind(this)
  _handleUnlink = this._handleUnlink.bind(this)

  render() {
    const { editorState, linking, view } = this.state
    return (
      <div className="maha-htmlfield">
        <div className="maha-htmlfield-header">
          <div className="maha-htmlfield-header-section">
            <div className={ this._getIconClass() } onClick={ (view == 'text') ? this._handleBlockType.bind(this, 'header-one') : null }>
              <i className="fa fa-fw fa-header" />
            </div>
            <div className={ this._getIconClass() } onClick={ (view == 'text') ? this._handleInlineStyle.bind(this, 'BOLD') : null }>
              <i className="fa fa-fw fa-bold" />
            </div>
            <div className={ this._getIconClass() } onClick={ (view == 'text') ? this._handleInlineStyle.bind(this, 'ITALIC') : null }>
              <i className="fa fa-fw fa-italic" />
            </div>
            <div className={ this._getIconClass() } onClick={ (view == 'text') ? this._handleInlineStyle.bind(this, 'UNDERLINE') : null }>
              <i className="fa fa-fw fa-underline" />
            </div>
          </div>
          <div className="maha-htmlfield-header-section">
            <div className={ this._getIconClass() } onClick={ (view == 'text') ? this._handleBeginLink : null }>
              <i className="fa fa-fw fa-link" />
            </div>
            <div className={ this._getIconClass() } onClick={ (view == 'text') ? this._handleUnlink : null }>
              <i className="fa fa-fw fa-unlink" />
            </div>
          </div>
          <div className="maha-htmlfield-header-section">
            <div className={ this._getIconClass() } onClick={ (view == 'text') ? this._handleBlockType.bind(this, 'ordered-list-item') : null }>
              <i className="fa fa-fw fa-list-ol" />
            </div>
            <div className={ this._getIconClass() } onClick={ (view == 'text') ? this._handleBlockType.bind(this, 'unordered-list-item') : null }>
              <i className="fa fa-fw fa-list-ul" />
            </div>
          </div>
          <div className="maha-htmlfield-header-section">
            <div className="maha-htmlfield-header-icon" onClick={ this._handleCodeToggle }>
              <i className="fa fa-fw fa-code" />
            </div>
          </div>
        </div>
        <CSSTransition in={ linking } classNames="expanded" timeout={ 150 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-htmlfield-input">
            <div className="maha-htmlfield-input-element">
              <input { ...this._getLinkInput()}/>
            </div>
            <div className="maha-htmlfield-input-icon" onClick={ this._handleEndLink }>
              <i className="fa fa-times" />
            </div>
          </div>
        </CSSTransition>
        <CSSTransition in={ linking } classNames="expanded" timeout={ 150 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-htmlfield-overlay" onClick={ this._handleEndLink } />
        </CSSTransition>
        <div className="maha-htmlfield-body">
          { editorState && view == 'text' && <Editor { ...this._getEditor() } /> }
          { editorState && view == 'code' && <textarea { ...this._getTextarea() } /> }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const editorState = this._getEditorState()
    this._handleChange(editorState)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { defaultValue } = this.props
    const { code } = this.state
    if(defaultValue != '' && code != defaultValue){
      const editorState = this._getEditorState(code)
      this._handleChange(editorState)
    }
  }

  _getTextarea() {
    return {
      onChange: this._handleTextareaChange,
      defaultValue: this.state.code
    }
  }

  _getIconClass() {
    if(this.state.view == 'text'){
      return 'maha-htmlfield-header-icon enabled'
    } else {
      return 'maha-htmlfield-header-icon disabled'
    }
  }

  _getEditorState(content) {
    const decorator = this._getDecorator()
    const newContent = this._getDefaultContent(content)

    if(newContent) return EditorState.createWithContent(newContent, decorator)

    return EditorState.createEmpty(decorator)
  }

  _getDecorator() {
    return new CompositeDecorator([
      {
        strategy: linkStrategy,
        component: Link
      }
    ])
  }

  _getDefaultContent(content) {
    const { defaultValue } = this.props
    const value = (content) ? content : defaultValue
    if(!value) return null
    return convertFromHTML({
      htmlToEntity: (nodeName, node, createEntity) => {
        if (nodeName === 'a') {
          return createEntity(
            'LINK',
            'MUTABLE',
            { url: node.href }
          )
        }
      }
    })(value)
  }

  _getLinkInput() {
    return {
      type: 'text',
      placeholder: 'Enter a link',
      ref: node => this.link = node,
      defaultValue: this.state.url,
      onKeyDown: this._handleLinkKeyDown.bind(this)
    }
  }

  _getEditor() {
    const { editorState } = this.state
    return {
      ref: node => this.el = node,
      editorState: editorState,
      onChange: this._handleChange.bind(this),
      blockStyleFn: this._getBlockStyle
    }
  }

  _handleInlineStyle(style) {
    this._handleChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      style
    ))
  }

  _handleBlockType(blockType) {
    this._handleChange(RichUtils.toggleBlockType(
      this.state.editorState,
      blockType
    ))
  }

  _handleCodeToggle(){
    const view = (this.state.view == 'code') ? 'text' : 'code'
    this.setState({
      view
    })
  }

  _handleBeginLink() {
    const { editorState } = this.state
    const selection = editorState.getSelection()
    if (selection.isCollapsed()) return
    const contentState = editorState.getCurrentContent()
    const startKey = editorState.getSelection().getStartKey()
    const startOffset = editorState.getSelection().getStartOffset()
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)
    let url = ''
    if (linkKey) {
      const linkInstance = contentState.getEntity(linkKey)
      url = linkInstance.getData().url
    }
    this.setState({
      linking: true,
      url
    }, () => {
      setTimeout(() => this.link.focus(), 0)
    })

  }

  _handleEndLink() {
    this.setState({
      linking: false,
      url: null
    })
  }

  _handleLinkKeyDown(e) {
    if(e.which !== 13) return
    this._handleLinkChange(this.link.value)
  }

  _handleLinkChange(url) {
    const { editorState } = this.state
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
    const replacementState = RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    )
    this.setState({
      editorState: replacementState,
      linking: false
    }, () => {
      setTimeout(() => this.el.focus(), 0);
    })
  }

  _handleUnlink() {
    const { editorState } = this.state
    const selection = editorState.getSelection()
    if(selection.isCollapsed()) return
    const replacementState = RichUtils.toggleLink(editorState, selection, null)
    this.setState({
      editorState: replacementState
    })
  }

  _handleTextareaChange(event) {
    this.setState({ code: event.target.value })
  }

  _handleChange(editorState) {
    this.setState({ editorState })
    const value = convertToHTML({
      entityToHTML: (entity, originalText) => {
        if(entity.type === 'LINK') {
          return <a href={ entity.data.url }>{ originalText }</a>
        }
        return originalText
      }
    })(editorState.getCurrentContent())
    this.setState({ code: value })
    this.props.onChange(value)
  }

}

export default htmlfield
