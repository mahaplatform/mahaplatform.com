import PropTypes from 'prop-types'
import React from 'react'

class Canvas extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  render() {
    const config = [
      {
        type: 'speak'
      },
      {
        type: 'question',
        options: [
          { value: 'yes', text: 'Yes' }
        ]
      }
    ]
    return (
      <div className="flowchart-canvas">
        <div className="flowchart">
          <div className="flowchart-branches">
            <div className="flowchart-branch">
              <div className="flowchart-box-padding">
                <div className="flowchart-box speak">
                  <div className="flowchart-box-icon">
                    <i className="fa fa-volume-control-phone"></i>
                  </div>
                  speak
                </div>
              </div>
              <div className="flowchart-tree">
                <div className="flowchart-tree-trunk">
                  <div className="flowchart-tree-line"></div>
                </div>
              </div>
              <div className="flowchart-box-padding">
                <div className="flowchart-box gather">
                  <div className="flowchart-box-icon">
                    <i className="fa fa-question"></i>
                  </div>
                  gather
                </div>
              </div>
              <div className="flowchart-tree">
                <div className="flowchart-tree-trunk">
                  <div className="flowchart-tree-line"></div>
                </div>
                <div className="flowchart-branches">
                  <div className="flowchart-branch">
                    <div className="flowchart-tree-line">
                      <div className="flowchart-tree-line-label">yes</div>
                    </div>
                    <div className="flowchart-box hangup">
                      <div className="flowchart-box-icon">
                        <i className="fa fa-phone"></i>
                      </div>
                      hangup
                    </div>
                  </div>
                  <div className="flowchart-branch">
                    <div className="flowchart-tree-line">
                      <div className="flowchart-tree-line-label">no</div>
                    </div>
                    <div className="flowchart-box-padding">
                      <div className="flowchart-box gather">
                        <div className="flowchart-box-icon">
                          <i className="fa fa-question"></i>
                        </div>
                        gather
                      </div>
                    </div>
                    <div className="flowchart-tree">
                      <div className="flowchart-tree-trunk">
                        <div className="flowchart-tree-line"></div>
                      </div>
                      <div className="flowchart-branches">
                        <div className="flowchart-branch">
                          <div className="flowchart-tree-line">
                            <div className="flowchart-tree-line-label">1</div>
                          </div>
                          <div className="flowchart-box-padding">
                            <div className="flowchart-box speak">
                              <div className="flowchart-box-icon">
                                <i className="fa fa-volume-control-phone"></i>
                              </div>
                              speak
                            </div>
                          </div>
                          <div className="flowchart-tree">
                            <div className="flowchart-tree-trunk">
                              <div className="flowchart-tree-line"></div>
                            </div>
                          </div>
                          <div className="flowchart-box hangup">
                            <div className="flowchart-box-icon">
                              <i className="fa fa-phone"></i>
                            </div>
                            hangup
                          </div>
                        </div>
                        <div className="flowchart-branch">
                          <div className="flowchart-tree-line">
                            <div className="flowchart-tree-line-label">2</div>
                          </div>
                          <div className="flowchart-box-padding">
                            <div className="flowchart-box gather">
                              <div className="flowchart-box-icon">
                                <i className="fa fa-question"></i>
                              </div>
                              gather
                            </div>
                          </div>
                          <div className="flowchart-tree">
                            <div className="flowchart-tree-trunk">
                              <div className="flowchart-tree-line"></div>
                            </div>
                            <div className="flowchart-branches">
                              <div className="flowchart-branch">
                                <div className="flowchart-tree-line">
                                  <div className="flowchart-tree-line-label">1</div>
                                </div>
                                <div className="flowchart-box-padding">
                                  <div className="flowchart-box hangup">
                                    <div className="flowchart-box-icon">
                                      <i className="fa fa-phone"></i>
                                    </div>
                                    hangup
                                  </div>
                                </div>
                              </div>
                              <div className="flowchart-branch">
                                <div className="flowchart-tree-line">
                                  <div className="flowchart-tree-line-label">2</div>
                                </div>
                                <div className="flowchart-box-padding">
                                  <div className="flowchart-box hangup">
                                    <div className="flowchart-box-icon">
                                      <i className="fa fa-phone"></i>
                                    </div>
                                    hangup
                                  </div>
                                </div>
                              </div>
                              <div className="flowchart-branch">
                                <div className="flowchart-tree-line">
                                  <div className="flowchart-tree-line-label">3</div>
                                </div>
                                <div className="flowchart-box-padding">
                                  <div className="flowchart-box hangup">
                                    <div className="flowchart-box-icon">
                                      <i className="fa fa-phone"></i>
                                    </div>
                                    hangup
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flowchart-branch">
                          <div className="flowchart-tree-line">
                            <div className="flowchart-tree-line-label">3</div>
                          </div>
                          <div className="flowchart-box-padding">
                            <div className="flowchart-box hangup">
                              <div className="flowchart-box-icon">
                                <i className="fa fa-phone"></i>
                              </div>
                              hangup
                            </div>
                          </div>
                        </div>
                      </div>
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
