import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Responsibilities from './responsibilities.js'

describe('src/web/apps/appraisals/admin/components/responsibilities', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/responsibilities.js', () => {

    it('renders', async () => {

      const responsibilities = shallow(<Responsibilities />)

      expect(responsibilities.is('div.responsibilities')).to.be.true

    })

  })


})
