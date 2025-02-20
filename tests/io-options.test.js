/* globals describe, expect, it */
import { execa } from 'execa'
import { existsSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
const tempFilePath = () => join(tmpdir(), `temp-${Date.now()}.txt`)

const filePrefix = 'chapters-dev/tests/samples/'

describe('reading and writing from and to various sources and destinations', () => {
  it('chapconv convert -i input.xml -o output.json', async () => {
    const target = tempFilePath()
    await execa('node', ['./index.js', 'convert', '-i', filePrefix + 'applechapters.xml', '-f', 'applehls', '-o', target], { reject: false })
    expect(existsSync(target)).toBe(true)
  })

  it('cat input.xml | chapconv convert -o output.json', async () => {
    const target = tempFilePath()
    await execa('cat', [filePrefix + 'applechapters.xml'])
      .pipe('node', ['./index.js', 'convert', '-f', 'applehls', '-o', target], { reject: false })
    expect(existsSync(target)).toBe(true)
  })

  it('cat input.xml | chapconv convert', async () => {
    const { stdout } = await execa('cat', [filePrefix + 'applechapters.xml'])
      .pipe('node', ['./index.js', 'convert', '-f', 'applehls'], { reject: false })
    expect(stdout).toContain('chapter-1')
  })

  it('cat input.xml | chapconv convert > output.json', async () => {
    const target = tempFilePath()
    await execa('cat', [filePrefix + 'applechapters.xml'])
      .pipe('node', ['./index.js', 'convert', '-f', 'applehls', '>', target], { shell: true, reject: false })
    expect(existsSync(target)).toBe(true)
  })

  it('chapconv convert -o output.json < input.xml', async () => {
    const target = tempFilePath()
    await execa('node', ['./index.js', 'convert', '-f', 'applehls', '-o', target, '<', filePrefix + 'applechapters.xml'], { shell: true, reject: false })
    expect(existsSync(target)).toBe(true)
  })

  it('chapconv convert < input.xml > output.json', async () => {
    const target = tempFilePath()
    await execa('node', ['./index.js', 'convert', '-f', 'applehls', '<', filePrefix + 'applechapters.xml', '>', target], { shell: true, reject: false })
    expect(existsSync(target)).toBe(true)
  })

  it('chapconv convert -i input.xml > output.json', async () => {
    const target = tempFilePath()
    await execa('node', ['./index.js', 'convert', '-f', 'applehls', '-i', filePrefix + 'applechapters.xml', '>', target], { shell: true, reject: false })
    expect(existsSync(target)).toBe(true)
  })
})
