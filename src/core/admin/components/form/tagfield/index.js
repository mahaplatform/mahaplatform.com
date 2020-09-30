import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class TagField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array,
    placeholder: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Separate tags with a comma',
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    tag: '',
    tags: []
  }

  _handleChange = this._handleChange.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { tags } = this.state
    return (
      <div className="maha-tagfield">
        <div className="maha-tagfield-field">
          { tags.length > 0 &&
            <div className="maha-tagfield-tags">
              { tags.map((tag, index) => (
                <div className="maha-tagfield-tag" key={`tag_${index}`}>
                  <div className="maha-tagfield-tag-label">
                    { tag }
                  </div>
                  <Button { ...this._getRemove(index) } />
                </div>
              ))}
            </div>
          }
          <div className="maha-tagfield-input">
            <input { ...this._getInput() } />
          </div>
        </div>
        { tags.length > 0 &&
          <Button { ...this._getClear() } />
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) {
      this.setState({
        tags: defaultValue
      })
    }
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { tags } = this.state
    if(!_.isEqual(tags, prevState.tags)) {
      this._handleChange()
    }
  }

  _getClear() {
    return {
      icon: 'times',
      className: 'maha-tagfield-clear',
      handler: this._handleClear
    }
  }

  _getInput() {
    const { placeholder, tabIndex } = this.props
    const { tag } = this.state
    return {
      type: 'text',
      placeholder,
      tabIndex,
      value: tag,
      onKeyDown: this._handleKeyDown,
      onChange: this._handleUpdate
    }
  }

  _getRemove(index) {
    return {
      icon: 'times',
      className: 'maha-tagfield-tag-action',
      handler: this._handleRemove.bind(this, index)
    }
  }

  _handleChange() {
    const { tags } = this.state
    this.props.onChange(tags)
  }

  _handleClear() {
    this.setState({
      tags: [],
      tag: ''
    })
  }

  _handleKeyDown(e) {
    const { tag, tags } = this.state
    if(tag.length > 0 && _.includes([13,188], e.which)) {
      this.setState({
        tags: [
          ...tags,
          tag
        ],
        tag: ''
      })
      e.preventDefault()
    }
  }

  _handleRemove(i) {
    this.setState({
      tags: [
        ...this.state.tags.filter((tag, index) => {
          return index !== i
        })
      ]
    })
  }

  _handleUpdate(e) {
    this.setState({
      tag: e.target.value
    })
  }

}

export default TagField
