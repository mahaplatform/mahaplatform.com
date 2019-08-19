import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Table from './table.js'

describe('src/web/core/admin/components/table', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/table.js', () => {

    it('renders', async () => {

      const table = shallow(<Table />)

      expect(table.is('div.table')).to.be.true

    })

  })


})
