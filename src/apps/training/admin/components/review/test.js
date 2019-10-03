import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Review from './review.js'

describe('src/apps/training/admin/components/review', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/review.js', () => {

    it('renders', async () => {

      const review = shallow(<Review />)

      expect(review.is('div.review')).to.be.true

    })

  })


})
