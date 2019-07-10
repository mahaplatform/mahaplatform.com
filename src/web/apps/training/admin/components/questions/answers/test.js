import { shallow } from 'enzyme'
import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import Answers from './answers.js'

describe('./src/web/apps/training/admin/components/answers', () => {

  describe('/actions.js', () => {

    it('dispatches', async () => {})

  })

  describe('/selectors.js', () => {

    it('computes', async () => {})

  })

  describe('/reducer.js', () => {

    it('handles', async () => {})

  })


  describe('/answers.js', () => {

    it('renders', async () => {

      const answers = shallow(<Answers />)

      expect(answers.is('div.answers')).to.be.true

    })

  })


})
