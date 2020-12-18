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
            color: 'red'
          },
          rows: [
            {
              columns: [
                {
                  blocks: [
                    {
                      type: 'text',
                      text: 'foo'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'content'
        },{
          background: {
            color: 'red'
          },
          rows: [
            {
              columns: [
                {
                  blocks: [
                    {
                      type: 'text',
                      text: 'foo'
                    }
                  ]
                }
              ]
            }
          ]
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
            image: '/assets/8346/10156387003857338.jpg'
          },
          rows: [
            {
              sizing: {
                fullWidth: false
              },
              spacing: {
                padding: [10, 10, 10, 10]
              },
              background: {
                color: 'green'
              },
              columns: [
                {
                  alignment: {
                    align: 'middle'
                  },
                  spacing: {
                    padding: [10, 10, 10, 10]
                  },
                  blocks: [
                    {
                      type: 'text',
                      background: {
                        color: '#FFFFFF99'
                      },
                      spacing: {
                        padding: [10, 10, 10, 10]
                      },
                      text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
                    }
                  ]
                }, {
                  spacing: {
                    padding: [10, 10, 10, 10]
                  },
                  blocks: [
                    {
                      type: 'text',
                      background: {
                        color: '#FFFFFF99'
                      },
                      spacing: {
                        padding: [10, 10, 10, 10]
                      },
                      text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p><p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
                    }
                  ]
                }, {
                  alignment: {
                    align: 'bottom'
                  },
                  spacing: {
                    padding: [10, 10, 10, 10]
                  },
                  blocks: [
                    {
                      type: 'text',
                      background: {
                        color: '#FFFFFF99'
                      },
                      spacing: {
                        padding: [10, 10, 10, 10]
                      },
                      text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
                    }
                  ]
                }, {
                  spacing: {
                    padding: [10, 10, 10, 10]
                  },
                  blocks: [
                    {
                      type: 'text',
                      background: {
                        color: '#FFFFFF99'
                      },
                      spacing: {
                        padding: [10, 10, 10, 10]
                      },
                      text: '<p>Im baby meditation umami taiyaki man braid, godard +1 XOXO jianbing bespoke kitsch butcher artisan tumblr. Umami vape tote bag, raw denim austin tilde distillery bushwick. Seitan tote bag kogi, trust fund gochujang kickstarter listicle polaroid occupy pok pok lo-fi biodiesel literally portland. Poke cornhole vinyl, cray vexillologist shoreditch chia roof party.</p>'
                    }
                  ]
                }
              ]
            }
          ]
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
