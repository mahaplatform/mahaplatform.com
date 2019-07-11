import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Options from './options.js'

describe('src/web/apps/training/admin/components/options', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/options.js', () => {

    it('renders', async () => {

      const options = shallow(<Options />)

      expect(options.is('div.options')).to.be.true

    })

  })


})
