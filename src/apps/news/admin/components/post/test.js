import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Post from './post.js'

describe('src/apps/news/admin/components/post', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/post.js', () => {

    it('renders', async () => {

      const post = shallow(<Post />)

      expect(post.is('div.post')).to.be.true

    })

  })


})
