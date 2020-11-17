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
              computerColumns: 1,
              responsive: 'stackable',
              style: {
                backgroundColor: '#000000',
                color: '#FFFFFF'
              },
              columns: [
                {
                  blocks: [
                    {
                      style: {
                        textAlign: 'center'
                      },
                      type: 'text',
                      body: '<h1>Cornell Cooperative Extension of Tompkins County'
                    }
                  ]
                }
              ]
            }, {
              type: 'content'
            },{
              flow: 'fixed',
              columnSizing: 'fixed',
              computerColumns: 1,
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
                      body: '<p>Cornell Cooperative Extension is an employer and educator recognized for valuing AA/EEO, Protected Veterans, and Individuals with Disabilities and provides equal program and employment opportunities.</p><p></p><p>CCE-Tompkins Education Center</p><p>615 Willow Avenue</p><p>Ithaca, NY 14850-3555</p><p>TEL: 607.272.2292</p><p>FAX: 607.272.7088</p><p>tompkins@cornell.edu</p><p>Hours: 8:30am-4:30pm</p><p></p><p>© Copyright 2020. All Rights Reserved</p>',
                      style: {
                        padding: 10,
                        textAlign: 'center'
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
                          src: '/assets/8346/10156387003857338.jpg',
                          caption: '<p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg</p>'
                        },{
                          src: '/assets/8346/10156387003857338.jpg',
                          caption: '<p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg</p>'
                        },{
                          src: '/assets/8346/10156387003857338.jpg',
                          caption: '<p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg</p>'
                        }
                      ]
                    }
                  ]
                }
              ]
            }, {
              flow: 'fixed',
              columnSizing: 'fixed',
              computerColumns: 2,
              responsive: 'stackable',
              columns: [
                {
                  textAlign: 'center',
                  blocks: [
                    {
                      type: 'video',
                      image_url: 'https://i.ytimg.com/vi/Gn564RrfXkE/maxresdefault.jpg',
                      video_url: 'https://youtube.com/embed/Gn564RrfXkE',
                      caption: '<h2>Fall in Ithaca</h2><p>The leaves are <a href="http://google.com">google</a> so orange</p>',
                      style: {},
                      caption_style: {
                        backgroundColor: '#000000',
                        padding: 10,
                        h2_color: '#FFFFFF',
                        p_color: '#FFFFFF',
                        a_color: '#FFFFFF',
                        a_textDecoration: 'underline'
                      }
                    }
                  ]
                },{
                  textAlign: 'center',
                  blocks: [
                    {
                      type: 'video',
                      image_url: 'https://i.ytimg.com/vi/Gn564RrfXkE/maxresdefault.jpg',
                      video_url: 'https://youtube.com/embed/Gn564RrfXkE',
                      caption: '<h2>Fall in Ithaca</h2><p>The leaves are <a href="http://google.com">google</a> so orange</p>',
                      caption_style: {
                        backgroundColor: '#000000',
                        padding: 10,
                        h2_color: '#FFFFFF',
                        p_color: '#FFFFFF',
                        a_color: '#FFFFFF',
                        a_textDecoration: 'underline'
                      }
                    }
                  ]
                }
              ]
            }, {
              flow: 'fixed',
              columnSizing: 'variable',
              responsive: 'stackable',
              style: {
                backgroundColor: 'red',
                backgroundImage: '/assets/20463/red-leaves.jpeg',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: 500
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
                  verticalAlign: 'middle',
                  blocks: [
                    {
                      style: {
                        h2_color: 'white',
                        p_color: 'white'
                      },
                      type: 'text',
                      body: '<h2>Plaid pickled pitchfork</h2><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p><p></p><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p><p></p>'
                    }, {
                      type: 'button',
                      size: 'big',
                      color: 'blue',
                      text: 'Click Me',
                      link_strategy: 'web',
                      url: '/bar'
                    }
                  ]
                }, {
                  columnWidth: 2,
                  blocks: []
                }
              ]
            }, {
              flow: 'fixed',
              datasource: 'dynamic',
              data: [
                { id: 1, photo: '/assets/20462/aloja-250x250.jpg', name: 'Aloja Airewele', position: 'Energy Warriors Coordinator', phone: '(607) 272-2292 x156', email: 'aaa247@cornell.edu' },
                { id: 2, photo: '/assets/3/ska2.jpg', name: 'Sharon Anderson', position: 'Environment Team Leader', phone: '(607) 272-2292 x156', email: 'ska2@cornell.edu' },
                { id: 3, photo: '/assets/5/kwb6.jpg', name: 'Karim Beers', position: 'Get Your Green Back Coordinator', phone: '(607) 272-2292 x186', email: 'kwb6@cornell.edu' },
                { id: 4, photo: '/assets/17/jrc10.jpg', name: 'Jennie Cramer', position: 'Horticulture Program Manager', phone: '(607) 272-2292 x146', email: 'jrc10@cornell.edu' },
                { id: 5, photo: '/assets/20/jd285.jpg', name: 'Josh Dolan', position: 'Food Gardening Outreach Educator', phone: '(607) 272-2292 x190', email: 'jd285@cornell.edu' },
                { id: 6, photo: '/assets/4727/juliana-garcia150x150.jpg', name: 'Juliana Garcia', position: 'Two Generation Family & Community Educator', phone: '(607) 272-2292 x115', email: 'jag394@cornell.edu' },
                { id: 7, photo: '/assets/62/kem228.jpg', name: 'Kenneth McLaurin, Jr.', position: 'Financial Management Educator', phone: '(607) 272-2292 x120', email: 'kem228@cornell.edu' }
              ],
              columnSizing: 'fixed',
              computerColumns: 4,
              tabletColumns: 3,
              mobileColumns: 2,
              responsive: 'stackable',
              dataTemplate: {
                style: {
                  textAlign: 'center'
                },
                verticalAlign: 'middle',
                blocks: [
                  {
                    type: 'image',
                    image_format: 'rounded',
                    image_url: '{{ data.photo }}',
                    caption: '<p><strong>{{ data.name }}</strong></p><p>{{ data.position }}</p><p>{{ data.phone }}</p><p>{{ data.email }}</p>',
                    style: {
                      padding: 5
                    },
                    image_style: {
                      padding: 20
                    }
                  }
                ]
              }
            }, {
              flow: 'fixed',
              columnSizing: 'variable',
              responsive: 'stackable',
              style: {
                backgroundColor: 'red',
                backgroundImage: '/assets/8346/10156387003857338.jpg',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                minHeight: 500
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
                  verticalAlign: 'middle',
                  blocks: [
                    {
                      style: {
                        h2_color: 'white',
                        p_color: 'white'
                      },
                      type: 'text',
                      body: '<h2>Plaid pickled pitchfork</h2><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p><p></p><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p><p></p>'
                    }, {
                      type: 'button',
                      size: 'big',
                      color: 'blue',
                      text: 'Click Me',
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
              computerColumns: 3,
              responsive: 'stackable',
              columns: [
                {
                  verticalAlign: 'bottom',
                  style: {
                    backgroundImage: '/assets/8346/10156387003857338.jpg',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    textAlign: 'center',
                    height: 300,
                    padding: 10
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
                      style: {
                        padding: 10
                      },
                      color: 'blue',
                      text: 'Click Me'
                    }
                  ]
                },{
                  verticalAlign: 'bottom',
                  style: {
                    backgroundImage: '/assets/8346/10156387003857338.jpg',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    textAlign: 'center',
                    height: 300,
                    padding: 10
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
                      style: {
                        padding: 10
                      },
                      color: 'blue',
                      text: 'Click Me'
                    }
                  ]
                },{
                  verticalAlign: 'bottom',
                  style: {
                    backgroundImage: '/assets/8346/10156387003857338.jpg',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    textAlign: 'center',
                    height: 300,
                    padding: 10
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
                      style: {
                        padding: 10
                      },
                      color: 'blue',
                      text: 'Click Me'
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
