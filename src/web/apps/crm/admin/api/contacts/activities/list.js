import moment from 'moment'

const listRoute = async (req, res) => {

  res.status(200).respond([
    {
      type: 'call',
      user: {
        email: 'ams69@cornell.edu',
        full_name: 'Anna Steinkraus',
        id: 142,
        initials: 'as',
        photo: '/assets/78/ams69.jpg'
      },
      story: 'logged a phone call',
      created_at: moment().subtract(2, 'days'),
      data: {
        text: 'Lorem ipsum dolor amet listicle helvetica vape deep v. XOXO try-hard wayfarers keffiyeh hell of irony jean shorts +1. Adaptogen cray taxidermy banh mi church-key pabst. Farm-to-table iPhone coloring book DIY celiac messenger bag direct trade typewriter tumblr you probably havent heard of them irony.'
      }
    },{
      type: 'file',
      user: {
        email: 'gmk8@cornell.edu',
        full_name: 'Greg Kops',
        id: 79,
        initials: 'gk',
        photo: '/assets/48/gmk8.jpg'
      },
      story: 'uploaded a file',
      created_at: moment().subtract(5, 'days'),
      data: {
        content_type: 'image/jpeg',
        created_at: '2019-07-02T17:38:47.768Z',
        file_name: 'hardcider.jpeg',
        file_size: 156509,
        has_preview: false,
        id: 8121,
        is_infected: false,
        original_file_name: 'hardcider.jpeg',
        path: '/assets/8121/hardcider.jpeg',
        signed_url: 'https://s3.us-east-2.amazonaws.com/dev.cdn.mahaplatform.com/assets/8121/hardcider.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIDDVKP2HBE27SNKA%2F20190801%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20190801T034839Z&X-Amz-Expires=604800&X-Amz-Signature=3df9a78b3c78690477d1a73ec86f7ea928acb35268f724ba57d00db8d6935603&X-Amz-SignedHeaders=host',
        source: 'microsoft',
        source_url: 'https://1drv.ms/i/s!AABCT2nAZe3TgQI',
        status: 'processed',
        updated_at: '2019-07-24T17:20:59.003Z'
      }
    },{
      type: 'email',
      user: {
        email: 'ska2@cornell.edu',
        full_name: 'Sharon Anderson',
        id: 2,
        initials: 'sk',
        photo: '/assets/3/ska2.jpg'
      },
      story: 'attached an email',
      created_at: moment().subtract(6, 'days'),
      data: {
        date: moment('2019-03-22 10:14:56'),
        from: 'Sharon Anderson',
        to: 'Jane Doe',
        subject: 'Question About Upcoming Event',
        body: 'Lorem ipsum dolor amet gochujang try-hard bitters, sartorial pickled flannel trust fund vinyl activated charcoal 8-bit ennui. Selfies snackwave wayfarers, affogato dreamcatcher street art vinyl pop-up live-edge vaporware. Cardigan butcher keytar, tumblr dreamcatcher affogato keffiyeh. Typewriter palo santo messenger bag, seitan gentrify dreamcatcher banh mi vegan. Direct trade authentic 8-bit, single-origin coffee man braid biodiesel fixie health goth pitchfork. Selfies brooklyn microdosing, bicycle rights aesthetic copper mug deep v tousled mixtape. Next level photo booth trust fund pitchfork.'
      }
    },{
      type: 'transaction',
      user: {
        email: 'ks47@cornell.edu',
        full_name: 'Kenneth Schlather',
        id: 132,
        initials: 'ks',
        photo: '/assets/73/ks47.jpg'
      },
      story: 'created a transaction',
      created_at: moment().subtract(8, 'days'),
      data: {
        card: 'VISA-9257',
        amount: 400.00,
        transaction_id: '3dg6ji'
      }
    },{
      type: 'note',
      user: {
        email: 'sjr37@cornell.edu',
        full_name: 'Sandra Repp',
        id: 123,
        initials: 'sr',
        photo: '/assets/69/sjr37.jpg'
      },
      story: 'created a note',
      created_at: moment().subtract(12, 'days'),
      data: {
        text: 'Lorem ipsum dolor amet listicle helvetica vape deep v. XOXO try-hard wayfarers keffiyeh hell of irony jean shorts +1. Adaptogen cray taxidermy banh mi church-key pabst. Farm-to-table iPhone coloring book DIY celiac messenger bag direct trade typewriter tumblr you probably havent heard of them irony.'
      }
    },{
      type: 'event',
      story: 'registered for an event',
      created_at: moment().subtract(18, 'days'),
      data: {
        date: moment('2019-10-24'),
        title: 'Cajun Cooking Class',
        card: 'MASTERCARD-1195',
        amount: 25.00,
        transaction_id: 'adjif6'
      }
    },{
      type: 'visit',
      story: 'visited the website ccetompkins.org',
      created_at: moment().subtract(42, 'days'),
      data: [
        'http://ccetompkins.org',
        'http://ccetompkins.org/energy',
        'http://ccetompkins.org/energy/commercial-buildings',
        'http://ccetompkins.org/energy/commercial-buildings/architecture-2030'
      ]
    },{
      type: 'note',
      user: {
        email: 'gmk8@cornell.edu',
        full_name: 'Greg Kops',
        id: 79,
        initials: 'gk',
        photo: '/assets/48/gmk8.jpg'
      },
      story: 'created a note',
      created_at: moment().subtract(80, 'days'),
      data: {
        text: 'Stumptown kickstarter yuccie cred, affogato lyft before they sold out. Activated charcoal gastropub celiac helvetica knausgaard wayfarers pok pok pitchfork scenester deep v microdosing. Kitsch pickled irony street art flexitarian subway tile meggings farm-to-table kickstarter.'
      }
    },{
      type: 'blast',
      story: 'received an email blast',
      created_at: moment().subtract(101, 'days'),
      data: {
        date: moment('2019-04-06 02:00:00'),
        subject: 'April 2019 Newsletter',
        actions: [
          'received the email',
          'viewed the email',
          'clicked the link http://google.com',
          'clicked the link http://facebook.com',
          'viewed the email'
        ]
      }
    },{
      type: 'form',
      story: 'completed a form',
      created_at: moment().subtract(123, 'days'),
      data: [
        { label: 'First Name', value: 'Jane' },
        { label: 'Last Name', value: 'Doe' },
        { label: 'Email', value: 'janedoe@gmail.com' },
        { label: 'Phone', value: '(123) 456-7890' },
        { label: 'Inquiry', value: 'Stumptown kickstarter yuccie cred, affogato lyft before they sold out. Activated charcoal gastropub celiac helvetica knausgaard wayfarers pok pok pitchfork scenester deep v microdosing.' }
      ]
    }
  ])

}

export default listRoute
