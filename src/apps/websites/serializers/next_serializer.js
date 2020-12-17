const nextSerializer = (req, result) => ({
  site: {
    title: 'CCE Tompkins',
    homepage: 3
  },
  pages: [
    {
      id: 1,
      permalink: 'about',
      title: 'About Us',
      description: 'A page about us',
      rows: [
        {
          alignment: {
            align: 'center'
          },
          sizing: {
            fullWidth: false,
            customWidth: 700
          },
          spacing: {
            margin: 10,
            padding: 10
          },
          border: {
            radius: 5,
            style: 'solid',
            width: 1,
            color: '#FF0000'
          },
          columns: [
            {
              border: {
                style: 'solid',
                width: 1,
                color: '#0000FF'
              },
              background: {
                color: '#0000FF99'
              },
              blocks: [
                {
                  type: 'text',
                  text: '<p>one</p>'
                }
              ]
            }, {
              blocks: [
                {
                  type: 'text',
                  text: '<p>two</p>'
                }
              ]
            }, {
              blocks: [
                {
                  type: 'text',
                  text: '<p>three</p>'
                }
              ]
            }, {
              blocks: [
                {
                  type: 'text',
                  text: '<p>four</p>'
                }
              ]
            }
          ]
        }
      ]
    }, {
      id: 2,
      permalink: 'contact',
      title: 'Contact Us',
      description: 'A page to contact us',
      rows: []
    }, {
      id: 3,
      permalink: 'home',
      title: 'Home',
      description: 'The home page',
      rows: []
    }
  ]

})

export default nextSerializer
