import Layout from '../components/layout'
import Node from '../components/node'
import Head from 'next/head'
import React from 'react'

export default function Page({ config }) {
  return (
    <Layout config={ config.layout }>
      <Head>
        <title>{ config.metadata.title }</title>
      </Head>
      <Node config={ config.page } />
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } }
    ],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      config: {
        metadata: {
          title: 'Home',
          description: 'This is the home page'
        },
        aliases: [
          { permalink: '/', is_primary: true },
          { permalink: '/home', is_primary: false }
        ],
        layout: {
          sections: [
            {
              flow: 'fixed',
              columnSizing: 'fixed',
              numColumns: 1,
              responsive: 'stackable',
              style: {
                backgroundColor: '#000000',
                color: '#FFFFFF'
              },
              columns: [
                {
                  blocks: [
                    {
                      type: 'text',
                      body: '<h2>Plaid pickled pitchfork</h2><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos</p>'
                    }
                  ]
                }
              ]
            }, {
              type: 'content'
            },{
              flow: 'fixed',
              columnSizing: 'fixed',
              numColumns: 1,
              responsive: 'stackable',
              style: {
                backgroundColor: '#000000',
                color: '#FFFFFF',
                textAlign: 'center'
              },
              columns: [
                {
                  blocks: [
                    {
                      type: 'text',
                      body: '<p>Cornell Cooperative Extension is an employer and educator recognized for valuing AA/EEO, Protected Veterans, and Individuals with Disabilities and provides equal program and employment opportunities.</p><p></p><p>CCE-Tompkins Education Center</p><p>615 Willow Avenue</p><p>Ithaca, NY 14850-3555</p><p>TEL: 607.272.2292</p><p>FAX: 607.272.7088</p><p>tompkins@cornell.edu</p><p>Hours: 8:30am-4:30pm</p><p></p><p>© Copyright 2020. All Rights Reserved</p>',
                      style: {
                        padding: 10
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        page: {
          sections: [
            {
              flow: 'fluid',
              columnSizing: 'variable',
              numColumns: null,
              responsive: 'stackable',
              columns: [
                {
                  style: {
                    textAlign: 'left'
                  },
                  columnWidth: 16,
                  blocks: [
                    {
                      type: 'carousel',
                      slides: [
                        {
                          link: 'http://google.com',
                          src: '/assets/8346/10156387003857338.jpg',
                          caption: '<h2>Fall in Ithaca</h2><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p>'

                        },{
                          src: '/assets/8346/10156387003857338.jpg',
                          caption: '<h2>Fall in Ithaca</h2><p>The leaves are so orange</p>'
                        },{
                          src: '/assets/8346/10156387003857338.jpg',
                          caption: '<h2>Fall in Ithaca</h2><p>The leaves are so orange</p>'
                        }
                      ]
                    }
                  ]
                }
              ]
            }, {
              flow: 'fluid',
              columnSizing: 'fixed',
              numColumns: 2,
              responsive: 'stackable',
              columns: [
                {
                  textAlign: 'center',
                  blocks: [
                    {
                      type: 'image',
                      src: '/assets/8346/10156387003857338.jpg',
                      caption: '<h2>Fall in Ithaca</h2><p>The leaves are <a href="http://google.com">google</a> so orange</p>'
                    }
                  ]
                },{
                  textAlign: 'center',
                  blocks: [
                    {
                      type: 'image',
                      src: '/assets/8346/10156387003857338.jpg',
                      caption: '<h2>Winter in Ithaca</h2><p>The snow is so cold</p>'
                    }
                  ]
                }
              ]
            }, {
              flow: 'fixed',
              columnSizing: 'variable',
              numColumns: null,
              responsive: 'stackable',
              style: {
                backgroundColor: 'red',
                backgroundImage: '/assets/8346/10156387003857338.jpg',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              },
              columns: [
                {
                  columnWidth: 2,
                  blocks: []
                }, {
                  style: {
                    textAlign: 'center'
                  },
                  columnWidth: 12,
                  blocks: [
                    {
                      style: {
                        h2_color: 'white',
                        p_color: 'white'
                      },
                      type: 'text',
                      body: '<h2>Plaid pickled pitchfork</h2><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p>'
                    }, {
                      type: 'button',
                      size: 'big',
                      color: 'blue',
                      text: 'Click Me Damnit',
                      link_strategy: 'web',
                      url: '/bar'
                    }
                  ]
                }, {
                  columnWidth: 2,
                  blocks: []
                }
              ]
            },{
              flow: 'fixed',
              columnSizing: 'fixed',
              numColumns: 3,
              responsive: 'stackable',
              columns: [
                {
                  style: {
                    backgroundImage: '/assets/8346/10156387003857338.jpg',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    textAlign: 'center',
                    height: 300,
                  },
                  blocks: [
                    {
                      style: {
                        h2_fontFamily: '"Times New Roman", Times, serif',
                        h2_fontStyle: 'italic',
                        h2_fontWeight: 'normal',
                        h2_color: 'white',
                        p_color: 'white'
                      },
                      type: 'text',
                      body: '<h2>Fall in Ithaca</h2><p>The leaves are so orange</p>'
                    }
                  ]
                },{
                  style: {
                    backgroundImage: '/assets/8346/10156387003857338.jpg',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    textAlign: 'center',
                    height: 300
                  },
                  blocks: [
                    {
                      style: {
                        h2_fontFamily: '"Times New Roman", Times, serif',
                        h2_fontStyle: 'italic',
                        h2_fontWeight: 'normal',
                        h2_color: 'white',
                        p_color: 'white'
                      },
                      type: 'text',
                      body: '<h2>Fall in Ithaca</h2><p>The leaves are so orange</p>'
                    }
                  ]
                },{
                  style: {
                    backgroundImage: '/assets/8346/10156387003857338.jpg',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    textAlign: 'center',
                    height: 300
                  },
                  blocks: [
                    {
                      style: {
                        h2_fontFamily: '"Times New Roman", Times, serif',
                        h2_fontStyle: 'italic',
                        h2_fontWeight: 'normal',
                        h2_color: 'white',
                        p_color: 'white'
                      },
                      type: 'text',
                      body: '<h2>Fall in Ithaca</h2><p>The leaves are so orange</p>'
                    }, {
                      type: 'button',
                      size: 'big',
                      color: 'blue',
                      text: 'Click Me Damnit'
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    }
  }
}
