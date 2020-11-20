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
              flow: 'fluid',
              columnSizing: 'fixed',
              computerColumns: 1,
              responsive: 'stackable',
              style: {
                backgroundColor: '#B31B1B',
                color: '#FFFFFF'
              },
              columns: [
                {
                  blocks: [
                    {
                      style: {
                        textAlign: 'center',
                        padding: 14
                      },
                      type: 'text',
                      body: '<h1>Cornell Cooperative Extension<br />Suffolk County'
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
                        padding: 14,
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
                    textAlign: 'left',
                    padding: 14
                  },
                  columnWidth: 16,
                  blocks: [
                    {
                      type: 'carousel',
                      caption_style: {
                        backgroundColor: '#000000',
                        color: '#FFFFFF'
                      },
                      slides: [
                        {
                          src: '/assets/20558/parent.png',
                          caption: '<h2>Parent Talks</h2><p>Join us for open conversations about living with children! These 45 minute to one hour talks are for parents and other caregivers of children between the ages of 0-12.</p>'
                        },{
                          src: '/assets/20565/9th-annual-shellabration-header-extra-space.png',
                          caption: '<h2>Register Now: 2020 Virtual Shellabration</h2><p>Shellabration is an annual culinary celebration that showcases local shellfish and benefits Cornell Cooperative Extension Marine Program. This year we are going virtual!</p>'
                        }
                      ]
                    }
                  ]
                }
              ]
            }, {
              flow: 'fixed',
              columnSizing: 'fixed',
              computerColumns: 3,
              responsive: 'stackable',
              columns: [
                {
                  style: {
                    padding: 14
                  },
                  blocks: [
                    {
                      type: 'image',
                      image_url: '/assets/20559/biochar.jpg',
                      image_ratio: 2,
                      caption: '<h2>Biochar Webinar Series</h2><p>This biochar webinar series will provide an introduction to biochar and review some current advances.</p>',
                      caption_style: {
                        backgroundColor: '#00000011',
                        padding: 14
                      }
                    }
                  ]
                },{
                  style: {
                    padding: 14
                  },
                  blocks: [
                    {
                      type: 'image',
                      image_url: '/assets/20560/snowflake.jpg',
                      image_ratio: 2,
                      caption: '<h2>Sponsor a snowflake</h2><p>Theres nothing better than enjoying all the beautiful, magical lights that get put up for the season. This year we decided to bring that magic to the farm!</p>',
                      caption_style: {
                        backgroundColor: '#00000011',
                        padding: 14
                      }
                    }
                  ]
                },{
                  style: {
                    padding: 14
                  },
                  blocks: [
                    {
                      type: 'image',
                      image_url: '/assets/20561/local-food-basket-photo.jpg',
                      image_ratio: 2,
                      caption: '<h2>Why we crave foods</h2><p>Ever wonder why we crave certain foods given their sugar, fat and salt content? The answer lies in our hard-wired brains, not in our stomachs.</p>',
                      caption_style: {
                        backgroundColor: '#00000011',
                        padding: 14
                      }
                    }
                  ]
                }
              ]
            }, {
              flow: 'fixed',
              columnSizing: 'fixed',
              computerColumns: 3,
              responsive: 'stackable',
              columns: [
                {
                  style: {
                    padding: 14
                  },
                  blocks: [
                    {
                      type: 'image',
                      image_url: '/assets/20562/clams.png',
                      image_ratio: 2,
                      caption: '<h2>Video of the Week</h2><p>Each week well be presenting a "featured video" to help you get to know our staff and the work we do around Suffolk County!</p>',
                      caption_style: {
                        backgroundColor: '#00000011',
                        padding: 14
                      }
                    }
                  ]
                },{
                  style: {
                    padding: 14
                  },
                  blocks: [
                    {
                      type: 'image',
                      image_url: '/assets/20563/scallops.jpg',
                      image_ratio: 2,
                      caption: '<h2>CCE in the News</h2><p>They all died: Peconic Bay scallop harvesting season appears lost. They all died: Peconic Bay scallop harvesting season appears lost.</p>',
                      caption_style: {
                        backgroundColor: '#00000011',
                        padding: 14
                      }
                    }
                  ]
                },{
                  style: {
                    padding: 14
                  },
                  blocks: [
                    {
                      type: 'image',
                      image_url: '/assets/20564/covid-19-cce.jpg',
                      image_ratio: 2,
                      caption: '<h2>COVID-19 Resources</h2><p>The COVID-19 outbreak is a rapidly evolving situation and CCE is committed to providing resources that will help keep our communities resilient.</p>',
                      caption_style: {
                        backgroundColor: '#00000011',
                        padding: 14
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
                  style: {
                    textAlign: 'center',
                    padding: 14
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
                }
              ]
            }, {
              flow: 'fixed',
              columnSizing: 'fixed',
              computerColumns: 2,
              responsive: 'stackable',
              columns: [
                {
                  style: {
                    padding: 14
                  },
                  blocks: [
                    {
                      type: 'video',
                      image_url: 'https://i.ytimg.com/vi/Gn564RrfXkE/maxresdefault.jpg',
                      video_url: 'https://www.youtube.com/embed/ljYfshxMJfc',
                      caption: null
                    }
                  ]
                },{
                  style: {
                    padding: 14
                  },
                  blocks: [
                    {
                      type: 'video',
                      image_url: 'https://i.ytimg.com/vi/Gn564RrfXkE/maxresdefault.jpg',
                      video_url: 'https://www.youtube.com/embed/ZaCXerDx-b4',
                      caption: null
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
                  style: {
                    textAlign: 'center',
                    padding: 14
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
                      body: '<h2>Plaid pickled pitchfork</h2><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p><p></p><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p>'
                    }
                  ]
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
                  padding: 14,
                  textAlign: 'center'
                },
                verticalAlign: 'middle',
                blocks: [
                  {
                    type: 'image',
                    image_format: 'rounded',
                    image_url: '{{ data.photo }}',
                    image_ratio: 1,
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
                  style: {
                    textAlign: 'center',
                    padding: 14
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
                      body: '<p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p><p></p><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos organic cold-pressed 90s tumblr actually coloring book.</p>'
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
