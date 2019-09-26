export const types = [
  {
    label: 'Text Block',
    type: 'text',
    icon: 'align-justify',
    config: {
      columns: 1,
      split: [12],
      content_0: '<h1>Lorem ipsum dolor amet readymade</h1><h2>Fashion axe cornhole gochujang</h2><h3>Tofu unicorn kitsch, selfies craft beer</h3><h4>Try-hard mlkshk woke adaptogen</h4><p>Messenger bag portland adaptogen food truck pabst, la croix pug vinyl mumblecore chartreuse. Art party schlitz portland, try-hard semiotics tumblr green juice gentrify letterpress tilde gochujang whatever helvetica tote bag. Locavore quinoa man braid cred selvage chambray. Post-ironic everyday carry kale chips umami woke polaroid, meggings organic pork belly air plant.</p>',
      content_1: '<h1>Lorem ipsum dolor amet readymade</h1><h2>Fashion axe cornhole gochujang</h2><h3>Tofu unicorn kitsch, selfies craft beer</h3><h4>Try-hard mlkshk woke adaptogen</h4><p>Messenger bag portland adaptogen food truck pabst, la croix pug vinyl mumblecore chartreuse. Art party schlitz portland, try-hard semiotics tumblr green juice gentrify letterpress tilde gochujang whatever helvetica tote bag. Locavore quinoa man braid cred selvage chambray. Post-ironic everyday carry kale chips umami woke polaroid, meggings organic pork belly air plant.</p>',
      font_family: null,
      font_size: null,
      color: null,
      line_height: null,
      letter_spacing: null
    }
  }, {
    label: 'Divider Block',
    type: 'divider',
    icon: 'minus',
    config: {
      padding_top: '18px',
      padding_bottom: '18px',
      border: '2px solid #000000',
      background_color: null
    }
  }, {
    label: 'Images Block',
    type: 'images',
    icon: 'picture-o',
    config: {
      images: [
        { asset_id: 8117, transforms: { bri: 50 } },
        { asset_id: 8120, transforms: { bri: -50 } },
        { asset_id: 8368, transforms: { filter: 'orangePeel' } },
        { asset_id: 8117, transforms: { filter: 'vintage' } },
        { asset_id: 8120, transforms: { con: 80 } },
        { asset_id: 8368, transforms: { con: -80 } }
      ],
      border: null,
      border_radius: null,
      layout: [1]
    }
  }, {
    label: 'Button Block',
    type: 'button',
    icon: 'mouse-pointer',
    config: {
      content: 'Click Me',
      link_strategy: 'web',
      url: null,
      email_address: null,
      email_subject: null,
      email_body: null,
      anchor: null,
      asset_id: null,
      open_in_new_window: true,
      title: null,
      class: null,
      border: null,
      border_radius: null,
      background_color: '#2185D0',
      color: '#FFFFFF',
      letter_spacing: 0,
      font_family: null,
      font_size: null,
      padding: '10px',
      align: 'center',
      display: 'inline'
    }
  }, {
    label: 'Social Share Block',
    type: 'share',
    icon: 'share',
    config: {
    }
  }, {
    label: 'Social Follow Block',
    type: 'follow',
    icon: 'plus',
    config: {
    }
  }, {
    label: 'Footer Block',
    type: 'footer',
    icon: 'file-text-o',
    config: {
    }
  }, {
    label: 'Code Block',
    type: 'code',
    icon: 'code',
    config: {
      content: '<p>This is some custom HTML</p>'
    }
  }, {
    label: 'Video Block',
    type: 'video',
    icon: 'play-circle',
    config: {
    }
  }
]
