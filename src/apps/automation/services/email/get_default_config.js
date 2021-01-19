const getDefaultConfig = (body = null) => ({
  page: {
    background_color: '#DFDFDF'
  },
  header: {
    blocks: [{
      type: 'web',
      text: `
        <p>
          Not displaying correctly?
          <a href="<%- email.web_link %>">View in browser</a>
        </p>
      `,
      padding: 8,
      p_font_size: 12,
      p_text_align: 'center',
      p_line_height: 1.5
    }]
  },
  body: {
    background_color: '#FFFFFF',
    blocks: [{
      type: 'text',
      content_0: body || `
        <p><%- contact.first_name %>,</p>
        <p></p>
        <p>Messenger bag portland adaptogen food truck pabst, la croix pug
        vinyl mumblecore chartreuse. Art party schlitz portland, try-hard
        semiotics tumblr green juice gentrify letterpress tilde gochujang
        whatever helvetica tote bag. Locavore quinoa man braid cred selvage
        chambray. Post-ironic everyday carry kale chips umami woke polaroid,
        meggings organic pork belly air plant.</p>
      `,
      padding: 16
    }]
  },
  footer: {
    blocks: [{
      type: 'preferences',
      text: `
        <p>
          This email was sent to <strong><%- contact.email %></strong>. If you
          would like to control how much email you receive from us, you can
          <a href="<%- email.preferences_link %>">adjust your preferences</a>
        </p>
      `,
      padding: 8,
      p_font_size: 12,
      p_text_align: 'center',
      p_line_height: 1.5
    }]
  },
  settings: {}
})

export default getDefaultConfig
