const INITIAL_STATE = {
  config: {
    services: [
      {
        service: 'facebook',
        username: 'WRFI - Free Associations',
        logo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c66.66.828.828a/s50x50/1234543_423266591128174_1564843963_n.png?_nc_cat=101&_nc_oc=AQnWL_vK14fHVSoC2DMOw3jixfyVBej0wz8k8UvrmLhsKrm-sH0BwHD6Hk1aNAh10Eo&_nc_ht=scontent.xx&oh=654e24df3c98fab64c0a3758be42a5d0&oe=5DF0E80D',
        timestamp: '2019-10-04T15:23:45.850Z',
        message: 'Lorem ipsum dolor amet four loko keffiyeh synth, marfa truffaut williamsburg whatever retro man braid roof party. Af enamel pin before they sold out heirloom. Swag polaroid la croix copper mug offal, crucifix occupy meggings bicycle rights cray hot chicken seitan pickled 90s.',
        photos: [
          'https://gallery.mailchimp.com/5969bc90a0e21580d59e4afcc/images/7377097b-13f9-43c8-855d-6e1fdb477b11.png'
        ]
      }, {
        service: 'instagram',
        username: 'freeassociations',
        logo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c66.66.828.828a/s50x50/1234543_423266591128174_1564843963_n.png?_nc_cat=101&_nc_oc=AQnWL_vK14fHVSoC2DMOw3jixfyVBej0wz8k8UvrmLhsKrm-sH0BwHD6Hk1aNAh10Eo&_nc_ht=scontent.xx&oh=654e24df3c98fab64c0a3758be42a5d0&oe=5DF0E80D',
        message: 'Lorem ipsum dolor amet four loko keffiyeh synth, marfa truffaut williamsburg whatever retro man braid roof party. Af enamel pin before they sold out heirloom. Swag polaroid la croix copper mug offal, crucifix occupy meggings bicycle rights cray hot chicken seitan pickled 90s.',
        photo: 'https://gallery.mailchimp.com/5969bc90a0e21580d59e4afcc/images/7377097b-13f9-43c8-855d-6e1fdb477b11.png'
      }, {
        service: 'twitter',
        name: 'Free Associations',
        username: 'freeassociations',
        logo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c66.66.828.828a/s50x50/1234543_423266591128174_1564843963_n.png?_nc_cat=101&_nc_oc=AQnWL_vK14fHVSoC2DMOw3jixfyVBej0wz8k8UvrmLhsKrm-sH0BwHD6Hk1aNAh10Eo&_nc_ht=scontent.xx&oh=654e24df3c98fab64c0a3758be42a5d0&oe=5DF0E80D',
        message: 'Lorem ipsum dolor amet four loko keffiyeh synth, marfa truffaut williamsburg whatever retro man braid roof party. Af enamel pin before they sold out heirloom. Swag polaroid la croix copper mug offal, crucifix occupy meggings bicycle rights cray hot chicken seitan pickled 90s.',
        photos: [
          'https://gallery.mailchimp.com/5969bc90a0e21580d59e4afcc/images/7377097b-13f9-43c8-855d-6e1fdb477b11.png'
        ]
      }
    ]
  }
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  default:
    return state
  }

}

export default reducer
