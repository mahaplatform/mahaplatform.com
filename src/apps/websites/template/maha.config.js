export default {
  site: {
    title: 'CCE Tompkins',
    homepage: 3,
    pallette: {
      red: '#FF0000',
      blue: '#0000FF'
    }
  },
  layouts: [
    {
      id: 1,
      title: 'Basic Page',
      sections: [
        {
          background: {
            background: {
              type: 'color',
              color: 'red'
            }
          },
          content: {
            rows: [
              {
                content: {
                  layout: [1],
                  columns: [
                    {
                      content: {
                        blocks: [
                          {
                            type: 'text',
                            content: {
                              text: 'foo'
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          type: 'content'
        },{
          background: {
            background: {
              type: 'color',
              color: 'red'
            }
          },
          content: {
            rows: [
              {
                content: {
                  layout: [1],
                  columns: [
                    {
                      content: {
                        blocks: [
                          {
                            type: 'text',
                            content: {
                              text: 'foo'
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  ],
  pages: [
    {
      id: 1,
      layout_id: 1,
      permalink: 'about',
      title: 'About Us',
      description: 'A page about us',
      sections: [
        {
          background: {
            background: {
              type: 'image',
              image: '/assets/8346/10156387003857338.jpg'
            }
          },
          content: {
            rows: [
              {
                sizing: {
                  fullWidth: false
                },
                spacing: {
                  padding: [10, 10, 10, 10]
                },
                background: {
                  background: {
                    type: 'color',
                    color: '#DDDDDD'
                  }
                },
                content: {
                  layout: {
                    isResponsive: true,
                    desktop: [4,4,4],
                    tablet: [6,6],
                    mobile: [12]
                  },
                  columns: [
                    {
                      animation: {
                        type: 'fade',
                        duration: 1000,
                        delay: 0,
                        opacity: 0,
                        curve: 'ease-in-out',
                        repeat: 1
                      },
                      spacing: {
                        margin: [10, 10, 10, 10]
                      },
                      border: {
                        radius: 10
                      },
                      background: {
                        background: {
                          type: 'color',
                          color: '#FFFFFF99'
                        }
                      },
                      boxShadow: {
                        boxShadow: 1
                      },
                      content: {
                        blocks: [
                          {
                            type: 'image',
                            content: {
                              image: '/assets/8346/10156387003857338.jpg'
                            }
                          },{
                            type: 'text',
                            spacing: {
                              padding: [10, 10, 10, 10]
                            },
                            content: {
                              text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
                            }
                          },{
                            type: 'button',
                            spacing: {
                              padding: [10, 10, 10, 10]
                            },
                            button: {
                              custom: true,
                              color: '#FFFFFF',
                              background: {
                                all: {
                                  type: 'color',
                                  color: '#e22a8a'
                                },
                                hover: {
                                  type: 'color',
                                  color: '#7fba42'
                                }
                              },
                              border: {
                                radius: 5
                              }
                            },
                            content: {
                              text: 'Click Me'
                            }
                          }
                        ]
                      }
                    },
                    {
                      animation: {
                        type: 'fade',
                        duration: 1000,
                        delay: 0,
                        opacity: 0,
                        curve: 'ease-in-out',
                        repeat: 1
                      },
                      spacing: {
                        margin: [10, 10, 10, 10]
                      },
                      border: {
                        radius: 10
                      },
                      background: {
                        background: {
                          type: 'color',
                          color: '#FFFFFF99'
                        }
                      },
                      boxShadow: {
                        boxShadow: 1
                      },
                      content: {
                        blocks: [
                          {
                            type: 'image',
                            content: {
                              image: '/assets/8346/10156387003857338.jpg'
                            }
                          },{
                            type: 'text',
                            spacing: {
                              padding: [10, 10, 10, 10]
                            },
                            content: {
                              text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
                            }
                          },{
                            type: 'button',
                            spacing: {
                              padding: [10, 10, 10, 10]
                            },
                            button: {
                              custom: true,
                              color: '#FFFFFF',
                              background: {
                                all: {
                                  type: 'color',
                                  color: '#e22a8a'
                                },
                                hover: {
                                  type: 'color',
                                  color: '#7fba42'
                                }
                              },
                              border: {
                                radius: 5
                              }
                            },
                            content: {
                              text: 'Click Me'
                            }
                          }
                        ]
                      }
                    },
                    {
                      animation: {
                        type: 'fade',
                        duration: 1000,
                        delay: 0,
                        opacity: 0,
                        curve: 'ease-in-out',
                        repeat: 1
                      },
                      spacing: {
                        margin: [10, 10, 10, 10]
                      },
                      border: {
                        radius: 10
                      },
                      background: {
                        background: {
                          type: 'color',
                          color: '#FFFFFF99'
                        }
                      },
                      boxShadow: {
                        boxShadow: 1
                      },
                      content: {
                        blocks: [
                          {
                            type: 'image',
                            content: {
                              image: '/assets/8346/10156387003857338.jpg'
                            }
                          },{
                            type: 'text',
                            spacing: {
                              padding: [10, 10, 10, 10]
                            },
                            content: {
                              text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
                            }
                          },{
                            type: 'button',
                            spacing: {
                              padding: [10, 10, 10, 10]
                            },
                            button: {
                              custom: true,
                              color: '#FFFFFF',
                              background: {
                                all: {
                                  type: 'color',
                                  color: '#e22a8a'
                                },
                                hover: {
                                  type: 'color',
                                  color: '#7fba42'
                                }
                              },
                              border: {
                                radius: 5
                              }
                            },
                            content: {
                              text: 'Click Me'
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }, {
      id: 2,
      layout_id: 1,
      permalink: 'contact',
      title: 'Contact Us',
      description: 'A page to contact us',
      sections: []
    }, {
      id: 3,
      layout_id: 1,
      permalink: 'home',
      title: 'Home',
      description: 'The home page',
      sections: []
    }
  ]
}
