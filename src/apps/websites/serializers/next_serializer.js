const nextSerializer = (req, result) => ({
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
                  padding: 10
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
        }, {
          content: {
            rows: [
              {
                sizing: {
                  fullWidth: false
                },
                spacing: {
                  padding: 10
                },
                content: {
                  data: [
                    { id: 1, photo: '/assets/91/img-20161125-wa0002.jpg', name: 'Aloja Airewele', position: 'Energy Warriors Coordinator', phone: '(607) 272-2292 x156', email: 'aaa247@cornell.edu' },
                    { id: 2, photo: '/assets/3/ska2.jpg', name: 'Sharon Anderson', position: 'Environment Team Leader', phone: '(607) 272-2292 x156', email: 'ska2@cornell.edu' },
                    { id: 3, photo: '/assets/5/kwb6.jpg', name: 'Karim Beers', position: 'Get Your Green Back Coordinator', phone: '(607) 272-2292 x186', email: 'kwb6@cornell.edu' },
                    { id: 4, photo: '/assets/17/jrc10.jpg', name: 'Jennie Cramer', position: 'Horticulture Program Manager', phone: '(607) 272-2292 x146', email: 'jrc10@cornell.edu' },
                    { id: 5, photo: '/assets/20/jd285.jpg', name: 'Josh Dolan', position: 'Food Gardening Outreach Educator', phone: '(607) 272-2292 x190', email: 'jd285@cornell.edu' },
                    { id: 6, photo: '/assets/4727/juliana-garcia150x150.jpg', name: 'Juliana Garcia', position: 'Two Generation Family & Community Educator', phone: '(607) 272-2292 x115', email: 'jag394@cornell.edu' },
                    { id: 7, photo: '/assets/62/kem228.jpg', name: 'Kenneth McLaurin, Jr.', position: 'Financial Management Educator', phone: '(607) 272-2292 x120', email: 'kem228@cornell.edu' }
                  ],
                  layout: {
                    isResponsive: true,
                    desktop: [3,3,3],
                    tablet: [4,4,4],
                    mobile: [6,6]
                  },
                  template: {
                    animation: {
                      type: 'fade',
                      duration: 1000,
                      delay: 0,
                      opacity: 0,
                      curve: 'ease-in-out',
                      repeat: 1
                    },
                    background: {
                      background: {
                        hover: {
                          type: 'color',
                          color: '#EEEEEE'
                        }
                      }
                    },
                    border: {
                      radius: 5
                    },
                    spacing: {
                      padding: 20
                    },
                    content: {
                      blocks: [
                        {
                          type: 'image',
                          image: {
                            border: {
                              radius: '50%'
                            }
                          },
                          caption: {
                            sizing: {
                              height: 130
                            },
                            text: {
                              align: 'center'
                            },
                            spacing: {
                              padding: 10
                            }
                          },
                          content: {
                            image: '<%- data.photo %>',
                            caption: '<p><strong><%- data.name %></strong></p><p><%- data.position %></p><p><%- data.phone %></p><p><%- data.email %></p>',
                            link: 'http://cornell.edu'
                          }
                        }
                      ]
                    }
                  }
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
})

export default nextSerializer
