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
              isResponsive: false,
              isHover: false,
              all: {
                type: 'color',
                color: 'red'
              }
            }
          },
          content: {
            rows: [
              {
                content: {
                  layout: {
                    isResponsive: false,
                    all: [1]
                  },
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
              isResponsive: false,
              isHover: false,
              all: {
                type: 'color',
                color: 'red'
              }
            }
          },
          content: {
            rows: [
              {
                content: {
                  layout: {
                    isResponsive: false,
                    all: [1]
                  },
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
              isResponsive: false,
              isHover: false,
              all: {
                type: 'image',
                image: '/assets/8346/10156387003857338.jpg'
              }
            }
          },
          content: {
            rows: [
              {
                sizing: {
                  fullWidth: false
                },
                spacing: {
                  padding: {
                    isResponsive: false,
                    isHover: false,
                    all: [10, 10, 10, 10]
                  }
                },
                background: {
                  background: {
                    isResponsive: false,
                    isHover: true,
                    all: {
                      type: 'color',
                      color: 'green'
                    },
                    hover: {
                      type: 'color',
                      color: 'green'
                    }
                  }
                },
                content: {
                  layout: {
                    isResponsive: true,
                    desktop: [3,3,3,3],
                    tablet: [6,6],
                    mobile: [12]
                  },
                  columns: [
                    {
                      alignment: {
                        align: {
                          isResponsive: false,
                          isHover: false,
                          all: 'middle'
                        }
                      },
                      spacing: {
                        padding: {
                          isResponsive: false,
                          isHover: false,
                          all: [10, 10, 10, 10]
                        }
                      },
                      content: {
                        blocks: [
                          {
                            type: 'text',
                            background: {
                              background: {
                                isResponsive: false,
                                isHover: false,
                                all: {
                                  type: 'color',
                                  color: '#FFFFFF99'
                                }
                              }
                            },
                            spacing: {
                              padding: {
                                isResponsive: false,
                                isHover: false,
                                all: [10, 10, 10, 10]
                              }
                            },
                            content: {
                              text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
                            }
                          }
                        ]
                      }
                    },
                    {
                      alignment: {
                        align: {
                          isResponsive: false,
                          isHover: false,
                          all: 'middle'
                        }
                      },
                      spacing: {
                        padding: {
                          isResponsive: false,
                          isHover: false,
                          all: [10, 10, 10, 10]
                        }
                      },
                      content: {
                        blocks: [
                          {
                            type: 'text',
                            background: {
                              background: {
                                isResponsive: false,
                                isHover: false,
                                all: {
                                  type: 'color',
                                  color: '#FFFFFF99'
                                }
                              }
                            },
                            spacing: {
                              padding: {
                                isResponsive: false,
                                isHover: false,
                                all: [10, 10, 10, 10]
                              }
                            },
                            content: {
                              text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
                            }
                          }
                        ]
                      }
                    },
                    {
                      alignment: {
                        align: {
                          isResponsive: false,
                          isHover: false,
                          all: 'middle'
                        }
                      },
                      spacing: {
                        padding: {
                          isResponsive: false,
                          isHover: false,
                          all: [10, 10, 10, 10]
                        }
                      },
                      content: {
                        blocks: [
                          {
                            type: 'text',
                            background: {
                              background: {
                                isResponsive: false,
                                isHover: false,
                                all: {
                                  type: 'color',
                                  color: '#FFFFFF99'
                                }
                              }
                            },
                            spacing: {
                              padding: {
                                isResponsive: false,
                                isHover: false,
                                all: [10, 10, 10, 10]
                              }
                            },
                            content: {
                              text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
                            }
                          }
                        ]
                      }
                    },
                    {
                      alignment: {
                        align: {
                          isResponsive: false,
                          isHover: false,
                          all: 'middle'
                        }
                      },
                      spacing: {
                        padding: {
                          isResponsive: false,
                          isHover: false,
                          all: [10, 10, 10, 10]
                        }
                      },
                      content: {
                        blocks: [
                          {
                            type: 'text',
                            background: {
                              background: {
                                isResponsive: false,
                                isHover: false,
                                all: {
                                  type: 'color',
                                  color: '#FFFFFF99'
                                }
                              }
                            },
                            spacing: {
                              padding: {
                                isResponsive: false,
                                isHover: false,
                                all: [10, 10, 10, 10]
                              }
                            },
                            content: {
                              text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
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
})

export default nextSerializer
