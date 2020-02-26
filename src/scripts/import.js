import '../core/services/environment'
import { createFolder } from '../apps/drive/services/folders'
import { createAsset } from '../apps/maha/services/assets'
import { createFile } from '../apps/drive/services/files'
import Folder from '../apps/drive/models/folder'
import File from '../apps/drive/models/file'
import User from '../apps/maha/models/user'
import knex from '../core/services/knex'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'

const colors = {
  'FAILED': 'red',
  'SKIPPED': 'yellow',
  'CREATED': 'green'
}

const log = (msg, status) => {
  console.log(`${chalk.grey('[')}${chalk[colors[status]](status)}${chalk.grey(']')} ${chalk.white(msg)} `)
}

const read = (pathname, root = '') => {
  const fullpath = path.join(root, pathname)
  const type = fs.lstatSync(fullpath).isDirectory() ? 'folder' : 'file'
  return [
    { fullpath, type },
    ...type === 'folder' ? fs.readdirSync(fullpath).reduce((items, subpathname) => [
      ...items,
      ...read(subpathname, fullpath)
    ], []) : []
  ]
}

const processor = async () => {

  const argv = process.argv.slice(2)

  const root = argv[0]

  const mapped = argv[1]

  const user = await User.query(qb => {
    qb.where('id', 79)
  }).fetch({
    withRelated: ['team']
  })

  const items = read(root)

  await Promise.mapSeries(items, async (item) => {

    const fullpath = item.fullpath.replace(root, mapped)
    const parts = fullpath.split('/')
    const label = parts.slice(-1).join('/')
    const parentPath = parts.slice(0,-1).join('/')

    if(label[0] === '.') return

    await knex.transaction(async trx => {

      const req = {
        team: user.related('team'),
        user: user,
        trx
      }

      const parent = parentPath.length > 0 ? await Folder.query(qb => {
        qb.where('fullpath', parentPath)
      }).fetch({
        transacting: req.trx
      }) : null

      if(item.type === 'folder') {

        const folder = await Folder.query(qb => {
          qb.where('fullpath', fullpath)
        }).fetch({
          transacting: req.trx
        })

        if(folder) {

          log(fullpath, 'SKIPPED')

        } else {

          await createFolder(req, {
            parent_id: parent ? parent.get('id') : null,
            label
          })

          log(fullpath, 'CREATED')

        }

      } else if(item.type === 'file') {

        try {

          const file = await File.query(qb => {
            qb.where('fullpath', fullpath)
          }).fetch({
            transacting: req.trx
          })

          if(file) {

            log(fullpath, 'SKIPPED')

          } else {

            const asset = await createAsset(req, {
              team_id: req.team.get('id'),
              user_id: req.user.get('id'),
              source_id: 1,
              file_name: label,
              file_data: fs.readFileSync(item.fullpath)
            }, req.trx)

            await createFile(req, {
              asset_id: asset.get('id'),
              folder_id: parent ? parent.get('id') : null
            })

            log(fullpath, 'CREATED')

          }

        } catch(e) {

          log(fullpath, 'FAILED')

        }

      }

    })

  })

}

processor().then(process.exit)
