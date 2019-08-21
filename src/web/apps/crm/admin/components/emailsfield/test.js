import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Email from './email.js'

describe('src/web/apps/crm/admin/components/email', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/email.js', () => {

    it('renders', async () => {

      const email = shallow(<Email />)

      expect(email.is('div.email')).to.be.true

    })

  })


})
