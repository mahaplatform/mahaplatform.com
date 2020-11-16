import Layout from '../components/layout'
import Block from '../components/block'
import Head from 'next/head'
import React from 'react'

export default function Page({ config }) {
  return (
    <Layout config={ config.layout }>
      <Head>
        <title>{ config.metadata.title }</title>
      </Head>
      { config.blocks.map((block, index) => (
        <Block config={ block } key={`block_${index}`} />
      )) }
      <div>{ config.title }</div>
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
        layout: 'main',
        blocks: [
          {
            type: 'layout',
            flow: 'fixed',
            columnSizing: 'variable',
            numColumns: null,
            responsive: 'stackable',
            backgroundColor: 'red',
            backgroundImage: '/assets/8346/10156387003857338.jpg',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh',
            columns: [
              {
                columnWidth: 2,
                blocks: []
              }, {
                backgroundColor: null,
                textAlign: 'center',
                columnWidth: 12,
                blocks: [
                  {
                    backgroundColor: '#000000',
                    h2_color: 'white',
                    p_color: 'white',
                    type: 'text',
                    body: '<h2>Plaid pickled pitchfork</h2><p>Im baby selvage godard pug vaporware plaid pickled pitchfork. Roof party XOXO seitan air plant. Tbh bespoke blue bottle wolf, listicle bitters viral fingerstache. Raclette pug yr, farm-to-table retro williamsburg freegan narwhal umami iceland deep v. Street art flannel shabby chic swag aesthetic vaporware salvia umami kitsch portland +1 roof party jean shorts. Raw denim kitsch pitchfork stumptown health goth glossier kale chips man bun. Beard wayfarers hashtag master cleanse blog tacos</p>'
                  }, {
                    type: 'button',
                    backgroundColor: '#000000',
                    size: 'big',
                    color: 'red',
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
            type: 'layout',
            flow: 'fixed',
            columnSizing: 'variable',
            numColumns: null,
            responsive: 'stackable',
            backgroundColor: null,
            columns: [
              {
                backgroundColor: null,
                textAlign: 'left',
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
            type: 'layout',
            flow: 'fluid',
            columnSizing: 'fixed',
            numColumns: 2,
            responsive: 'stackable',
            backgroundColor: null,
            columns: [
              {
                backgroundColor: null,
                textAlign: 'center',
                width: null,
                blocks: [
                  {
                    type: 'image',
                    src: '/assets/8346/10156387003857338.jpg',
                    caption: '<h2>Fall in Ithaca</h2><p>The leaves are <a href="http://google.com">google</a> so orange</p>'
                  }
                ]
              },{
                backgroundColor: null,
                textAlign: 'center',
                width: null,
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
            type: 'layout',
            flow: 'fixed',
            columnSizing: 'variable',
            numColumns: null,
            responsive: 'stackable',
            backgroundColor: 'red',
            backgroundImage: '/assets/8346/10156387003857338.jpg',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            columns: [
              {
                columnWidth: 2,
                blocks: []
              }, {
                backgroundColor: null,
                textAlign: 'center',
                columnWidth: 12,
                blocks: [
                  {
                    h2_color: 'white',
                    p_color: 'white',
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
            type: 'layout',
            flow: 'fixed',
            columnSizing: 'fixed',
            numColumns: 3,
            responsive: 'stackable',
            backgroundColor: null,
            columns: [
              {
                backgroundColor: null,
                backgroundImage: '/assets/8346/10156387003857338.jpg',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                textAlign: 'center',
                width: null,
                height: 300,
                blocks: [
                  {
                    h2_fontFamily: '"Times New Roman", Times, serif',
                    h2_fontStyle: 'italic',
                    h2_fontWeight: 'normal',
                    h2_color: 'white',
                    p_color: 'white',
                    type: 'text',
                    body: '<h2>Fall in Ithaca</h2><p>The leaves are so orange</p>'
                  }
                ]
              },{
                backgroundColor: null,
                backgroundImage: '/assets/8346/10156387003857338.jpg',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                textAlign: 'center',
                width: null,
                height: 300,
                blocks: [
                  {
                    h2_fontFamily: '"Times New Roman", Times, serif',
                    h2_fontStyle: 'italic',
                    h2_fontWeight: 'normal',
                    h2_color: 'white',
                    p_color: 'white',
                    type: 'text',
                    body: '<h2>Fall in Ithaca</h2><p>The leaves are so orange</p>'
                  }
                ]
              },{
                backgroundColor: null,
                backgroundImage: '/assets/8346/10156387003857338.jpg',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                textAlign: 'center',
                width: null,
                height: 300,
                blocks: [
                  {
                    h2_fontFamily: '"Times New Roman", Times, serif',
                    h2_fontStyle: 'italic',
                    h2_fontWeight: 'normal',
                    h2_color: 'white',
                    p_color: 'white',
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
