import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Numbers from './numbers.js'

describe('src/web/apps/crm/admin/components/numbers', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/numbers.js', () => {

    it('renders', async () => {

      const numbers = shallow(<Numbers />)

      expect(numbers.is('div.numbers')).to.be.true

    })

  })


})
