import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class HtmlField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.string,
    state: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    defaultValue: '',
    onChange: (value) => {},
    onReady: () => {}
  }

  state = {
    state: null
  }

  _handleChange = _.throttle(this._handleChange.bind(this), 150)
  _handleEditorStateChange = this._handleEditorStateChange.bind(this)
  _handlePastedText = this._handlePastedText.bind(this)

  render() {
    return (
      <div className="maha-htmlfield">
        <Editor { ...this._getEditor() } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this._handleSet(defaultValue)
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { state } = this.state
    if(!_.isEqual(state, prevState.state)) {
      this._handleChange(state)
    }
  }

  _getEditor() {
    const { state } = this.state
    return {
      editorState: state,
      onEditorStateChange: this._handleEditorStateChange,
      toolbar: {
        options: ['inline','blockType','list','textAlign'],
        inline: {
          inDropdown: false,
          options: ['bold', 'italic', 'underline']
        },
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H1', 'H2', 'H3', 'H4']
        },
        list: {
          inDropdown: false,
          options: ['unordered', 'ordered']
        }
      },
      handlePastedText: this._handlePastedText
    }
  }

  _handleChange(state) {
    const html = draftToHtml(convertToRaw(state.getCurrentContent()))
    this.props.onChange(html)
  }

  _handleEditorStateChange(state) {
    this.setState({ state })
  }

  _handlePastedText(text, html) {
    const { state } = this.state
    const newContent = Modifier.insertText(
      state.getCurrentContent(),
      state.getSelection(),
      text
    )
    this._handleChange(EditorState.push(
      state,
      newContent,
      'insert-characters'
    ))
    return true
  }

  _handleSet(html) {
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const state = EditorState.createWithContent(contentState)
      this.setState({ state })
    }
  }

}

export default HtmlField
