import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import New from './new.js'

describe('src/web/core/admin/components/attachments/new', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/new.js', () => {

    it('renders', async () => {

      const new = shallow(<New />)

      expect(new.is('div.new')).to.be.true

    })

  })


})
