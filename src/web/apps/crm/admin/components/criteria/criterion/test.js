import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Criterion from './criterion.js'

describe('src/web/apps/crm/admin/components/criterion', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/criterion.js', () => {

    it('renders', async () => {

      const criterion = shallow(<Criterion />)

      expect(criterion.is('div.criterion')).to.be.true

    })

  })


})
