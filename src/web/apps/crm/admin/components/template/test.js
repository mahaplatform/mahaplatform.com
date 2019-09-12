import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Template from './template.js'

describe('src/web/apps/crm/admin/components/template', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/template.js', () => {

    it('renders', async () => {

      const template = shallow(<Template />)

      expect(template.is('div.template')).to.be.true

    })

  })


})
