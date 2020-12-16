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
      description: 'A page about us'
    }, {
      id: 2,
      permalink: 'contact',
      title: 'Contact Us',
      description: 'A page to contact us'
    }, {
      id: 3,
      permalink: 'home',
      title: 'Home',
      description: 'The home page'
    }
  ]

})

export default nextSerializer
