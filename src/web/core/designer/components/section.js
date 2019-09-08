import PropTypes from 'prop-types'
import Spacer from './spacer'
import Block from './block'
import React from 'react'

class Section extends React.Component {

  static propTypes = {
    config: PropTypes.object,
    sectionIndex: PropTypes.number
  }

  countdown = 0
  counter = 0

  _handleDrop = this._handleDrop.bind(this)
  _handleDragEnter = this._handleDragEnter.bind(this)
  _handleDragLeave = this._handleDragLeave.bind(this)
  _handleDragOver = this._handleDragOver.bind(this)

  render() {
    const { config, sectionIndex } = this.props
    const { blocks, padding_top, padding_bottom } = config
    return (
      <div { ...this._getDropZone() }>
        <table className={`section-${sectionIndex}`}>
          <tbody>
            <tr>
              <td>
                { padding_top && <Spacer height={ padding_top } /> }
                { blocks.map((block, index) => (
                  <Block key={`block_${index}`} { ...this._getBlock(block, index) } />
                )) }
                { blocks.length === 0 &&
                  <div className="dropzone-target">
                    <table className="row">
                      <tbody>
                        <tr>
                          <td className="large-12 first last columns">
                            Drop Block Here
                          </td>
                          <td className="expander"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                }
                { padding_bottom && <Spacer height={ padding_bottom } /> }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  _getBlock(config, blockIndex) {
    const { sectionIndex } = this.props
    return {
      sectionIndex,
      blockIndex,
      config
    }
  }


  _getDropZone() {
    const { config, sectionIndex } = this.props
    return {
      className: 'dropzone',
      'data-section': sectionIndex,
      'data-label': config.label,
      onDragEnter: this._handleDragEnter,
      onDragLeave: this._handleDragLeave,
      onDragOver: this._handleDragOver,
      onDrop: this._handleDrop
    }
  }

  _handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    window.parent.postMessage({
      target: 'designer',
      action: 'add',
      data: {
        section: parseInt(e.currentTarget.dataset.section),
        type: e.dataTransfer.getData('type')
      }
    }, '*')
  }

  _handleDragEnter(e) {
    e.preventDefault()
    e.stopPropagation()
    this.countdown = 1
    this.counter += 1
    console.log('dragenter')
  }

  _handleDragLeave(e) {
    e.preventDefault()
    e.stopPropagation()
    this.counter -= 1
    if (this.counter !== 0) return
    //e.currentTarget.className = 'dropzone'
    console.log('dragleave')
  }

  _getParent(el) {
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,'.block')))
    if(el) return el
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,'.section')))
    return el
  }

  _handleDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
    this.countdown += 1
    if(this.countdown % 30 !== 0) return
    var el = this._getParent(e.currentTarget)
    if(!el) return
    var rect = el.getBoundingClientRect()
    var middle = rect.y + (rect.height / 2)
    console.log('dragover')
  }

}

export default Section
