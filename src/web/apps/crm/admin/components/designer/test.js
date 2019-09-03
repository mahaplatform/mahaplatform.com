import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Designer from './designer.js'

describe('src/web/apps/crm/admin/components/designer', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/designer.js', () => {

    it('renders', async () => {

      const designer = shallow(<Designer />)

      expect(designer.is('div.designer')).to.be.true

    })

  })


})
