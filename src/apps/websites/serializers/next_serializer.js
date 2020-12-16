const nextSerializer = (req, result) => ({
  site: {
    title: 'CCE Tompkins',
    homepage: 3
  },
  pages: [
    {
      id: 1,
      permalink: 'about',
      title: 'About Us'
    }, {
      id: 2,
      permalink: 'contact',
      title: 'Contact Us'
    }, {
      id: 3,
      permalink: 'home',
      title: 'Home'
    }
  ]

})

export default nextSerializer
