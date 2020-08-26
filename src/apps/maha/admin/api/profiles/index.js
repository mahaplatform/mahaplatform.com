import contacts from './contacts'
import { Router } from 'express'
import surveys from './surveys'
import destroy from './destroy'
import photos from './photos'
import files from './files'
import email from './email'
import posts from './posts'
import lists from './lists'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:id', show)

router.delete('/:id', destroy)

router.use('/:profile_id/contacts', contacts)

router.use('/:profile_id/email', email)

router.use('/:profile_id/files', files)

router.use('/:profile_id/lists', lists)

router.use('/:profile_id/photos', photos)

router.use('/:profile_id/posts', posts)

router.use('/:profile_id/surveys', surveys)

export default router
