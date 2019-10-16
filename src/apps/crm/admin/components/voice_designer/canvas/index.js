import PropTypes from 'prop-types'
import React from 'react'

import Hangup from './hangup'
import Speak from './speak'

class Canvas extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    const config = [
      { code: 'abc123', type: 'speak' },
      {
        type: 'question',
        options: [
          { value: 'yes', text: 'Yes', then: [
            { code: 'abc123', type: 'speak' },
            { code: 'bcd123', type: 'hangup' }
          ] },
          { value: 'no', text: 'No', then: [
            { code: 'cde123', type: 'question', options: [
              { value: 1, text: 'One', then: [
                { code: 'def123', type: 'speak' },
                { code: 'ghi123', type: 'hangup' }
              ] },
              { value: 2, text: 'Two', then: [
                { code: 'hij123', type: 'question', options: [
                  { value: 1, text: 'One', then: [
                    { code: 'ijk123', type: 'speak' },
                    { code: 'jkl123', type: 'hangup' }
                  ] },
                  { value: 2, text: 'Two', then: [
                    { code: 'klm123', type: 'speak' },
                    { code: 'lmn123', type: 'hangup' }
                  ] },
                  { value: 3, text: 'Three', then: [
                    { code: 'mno123', type: 'speak' },
                    { code: 'nop123', type: 'hangup' }
                  ] }
                ] }
              ] },
              { value: 3, text: 'Three', then: [
                { code: 'opq123', type: 'speak' },
                { code: 'pqr123', type: 'hangup' }
              ] }
            ] }
          ] }
        ]
      }
    ]
    return (
      <div className="flowchart-canvas">
        <div className="flowchart">
          <div className="flowchart-tree">
            <Speak />
            <div className="flowchart-tree-trunk">
              <div className="flowchart-line"></div>
            </div>
            <div className="flowchart-box-padding">
              <div className="flowchart-box gather">
                <div className="flowchart-box-icon">
                  <i className="fa fa-question"></i>
                </div>
                gather
              </div>
            </div>
            <div className="flowchart-tree-trunk">
              <div className="flowchart-line"></div>
            </div>
            <div className="flowchart-branches">
              <div className="flowchart-branch">
                <div className="flowchart-line">
                  <div className="flowchart-line-label">yes</div>
                </div>
                <Speak />
                <div className="flowchart-tree-trunk">
                  <div className="flowchart-line"></div>
                </div>
                <Hangup />
              </div>
              <div className="flowchart-branch">
                <div className="flowchart-line">
                  <div className="flowchart-line-label">no</div>
                </div>
                <div className="flowchart-tree">
                  <div className="flowchart-box-padding">
                    <div className="flowchart-box gather">
                      <div className="flowchart-box-icon">
                        <i className="fa fa-question"></i>
                      </div>
                      gather
                    </div>
                  </div>
                  <div className="flowchart-tree-trunk">
                    <div className="flowchart-line"></div>
                  </div>
                  <div className="flowchart-branches">
                    <div className="flowchart-branch">
                      <div className="flowchart-line">
                        <div className="flowchart-line-label">1</div>
                      </div>
                      <Speak />
                      <div className="flowchart-tree">
                        <div className="flowchart-tree-trunk">
                          <div className="flowchart-line"></div>
                        </div>
                      </div>
                      <Hangup />
                    </div>
                    <div className="flowchart-branch">
                      <div className="flowchart-line">
                        <div className="flowchart-line-label">2</div>
                      </div>
                      <div className="flowchart-tree">
                        <div className="flowchart-box-padding">
                          <div className="flowchart-box gather">
                            <div className="flowchart-box-icon">
                              <i className="fa fa-question"></i>
                            </div>
                            gather
                          </div>
                        </div>
                        <div className="flowchart-tree-trunk">
                          <div className="flowchart-line"></div>
                        </div>
                        <div className="flowchart-branches">
                          <div className="flowchart-branch">
                            <div className="flowchart-line">
                              <div className="flowchart-line-label">1</div>
                            </div>
                            <Hangup />
                          </div>
                          <div className="flowchart-branch">
                            <div className="flowchart-line">
                              <div className="flowchart-line-label">2</div>
                            </div>
                            <Hangup />
                          </div>
                          <div className="flowchart-branch">
                            <div className="flowchart-line">
                              <div className="flowchart-line-label">3</div>
                            </div>
                            <Hangup />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flowchart-branch">
                      <div className="flowchart-line">
                        <div className="flowchart-line-label">3</div>
                      </div>
                      <Hangup />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}


}

export default Canvas
