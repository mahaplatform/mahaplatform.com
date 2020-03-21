import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Feed from './feed.js'

describe('src/apps/news/admin/components/feed', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/feed.js', () => {

    it('renders', async () => {

      const feed = shallow(<Feed />)

      expect(feed.is('div.feed')).to.be.true

    })

  })


})
