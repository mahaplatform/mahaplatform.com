import instagram from './instagram'
import microsoft from './microsoft'
import facebook from './facebook'
import { Router } from 'express'
import dropbox from './dropbox'
import google from './google'
import check from './check'
import list from './list'
import box from './box'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:source/check', check)

router.use('/box', box)

router.use('/dropbox', dropbox)

router.use('/facebook', facebook)

router.use('/google', google)

router.use('/instagram', instagram)

router.use('/microsoft', microsoft)

export default router
