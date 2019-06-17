import { createICO, createICNS } from 'png2icons'
import mkdirp from 'mkdirp'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const icons = async () => {

  const src = path.join('src','assets','icon.png')

  const output = path.join('src','mobile','res')

  const icons = [
    { platform: 'android', width: 36, name: 'ldpi', sizes: 1 },
    { platform: 'android', width: 48, name: 'mdpi', sizes: 1 },
    { platform: 'android', width: 72, name: 'hdpi', sizes: 1 },
    { platform: 'android', width: 96, name: 'xhdpi', sizes: 1 },
    { platform: 'android', width: 144, name: 'xxhdpi', sizes: 1 },
    { platform: 'android', width: 192, name: 'xxxhdpi', sizes: 1 },
    { platform: 'ios', width: 40, name: '40', sizes: 2 },
    { platform: 'ios', width: 50, name: '50', sizes: 2 },
    { platform: 'ios', width: 60, name: '60', sizes: 3 },
    { platform: 'ios', width: 72, name: '72', sizes: 2 },
    { platform: 'ios', width: 76, name: '76', sizes: 2 },
    { platform: 'ios', width: 29, name: 'small', sizes: 3 },
    { platform: 'ios', width: 57, name: null, sizes: 2 }
  ]

  await Promise.map(icons, async (icon) => {
    await Promise.map(Array(icon.sizes).fill(), async (i, index) => {
      const dpi = index > 0 ? `@${index+1}x` : ''
      const extension = icon.name ? `-${icon.name}` : ''
      const size = index > 0 ? icon.width * (index + 1) : icon.width
      const filename = `icon${extension}${dpi}.png`
      const filepath = path.join(output, icon.platform)
      const dest = path.join(filepath, filename)
      mkdirp.sync(filepath)
      await sharp(src).resize(size, size).toFile(dest)
    })
  })

  const icoinput = await sharp(src).resize(64, 64).toBuffer()
  const ico = await createICO(icoinput, 1, 0, true)
  fs.writeFileSync(path.join(output, 'icon.ico'), ico)

  const icnsinput = await sharp(src).resize(1024, 1024).toBuffer()
  const icns = await createICNS(icnsinput, 1, 0)
  fs.writeFileSync(path.join(output, 'icon.icns'), icns)

  const splashes = [
    { platform: 'android', width: 320, height: 426, name: 'splash-port-ldpi' },
    { platform: 'android', width: 320, height: 470, name: 'splash-port-mdpi' },
    { platform: 'android', width: 480, height: 640, name: 'splash-port-hdpi' },
    { platform: 'android', width: 720, height: 960, name: 'splash-port-xhdpi' },
    { platform: 'android', width: 426, height: 320, name: 'splash-land-ldpi' },
    { platform: 'android', width: 470, height: 320, name: 'splash-land-mdpi' },
    { platform: 'android', width: 640, height: 480, name: 'splash-land-hdpi' },
    { platform: 'android', width: 960, height: 720, name: 'splash-land-xhdpi' },
    { platform: 'ios', width: 2732, height: 2732, name: 'Default@2x~universal~anyany' },
    { platform: 'ios', width: 1278, height: 2732, name: 'Default@2x~universal~comany' },
    { platform: 'ios', width: 1334, height: 750, name: 'Default@2x~universal~comcom' },
    { platform: 'ios', width: 2208, height: 2208, name: 'Default@3x~universal~anyany' },
    { platform: 'ios', width: 2208, height: 1242, name: 'Default@3x~universal~anycom' },
    { platform: 'ios', width: 1242, height: 2208, name: 'Default@3x~universal~comany' }
  ]

  await Promise.map(splashes, async (splash) => {
    const filename = `${splash.name}.png`
    const filepath = path.join(output, splash.platform)
    const dest = path.join(filepath, filename)
    mkdirp.sync(filepath)
    await sharp({
      create: {
        width: splash.width,
        height: splash.height,
        channels: 4,
        background: '#000000'
      }
    }).composite([{ input: src, gravity: 'centre' }]).toFile(dest)
  })
}

icons().then(process.exit)
