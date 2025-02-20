/* globals describe, expect, it */
import { execaSync } from 'execa'

const formats = [
  ['applechapters.xml', 'applechapters'],
  ['applehls.json', 'applehls'],
  ['audible.json', 'audible'],
  ['chapters.json', 'chaptersjson'],
  ['FFMetadata.txt', 'ffmetadata'],
  ['ffmpeginfo.txt', 'ffmpeginfo'],
  ['matroska.xml', 'matroskaxml'],
  ['mkvmerge.simple.txt', 'mkvmergesimple'],
  ['mkvmerge.xml', 'mkvmergexml'],
  ['mp4chaps.txt', 'mp4chaps'],
  ['podlove-simple-chapters.xml', 'psc'],
  ['podlove.json', 'podlovejson'],
  ['pyscenedetect.csv', 'pyscenedetect'],
  ['scenecut.json', 'scenecut'],
  ['shutter.edl', 'shutteredl'],
  ['vorbiscomment.txt', 'vorbiscomment'],
  ['webvtt.txt', 'webvtt'],
  ['youtube-chapters.txt', 'youtube'],
]

const filePrefix = 'chapters-dev/tests/samples/'

describe('convert command accepts any supported format', () => {
  for (const [fileA, formatA] of formats) {
    // eslint-disable-next-line
    for (const [fileB, formatB] of formats) {
      if (formatA === formatB || formatB === 'ffmpeginfo') continue
      it(`converts ${formatA} to ${formatB} `, () => {
        const { stderr } = execaSync('node', ['./index.js', 'convert', '-i', filePrefix + fileA, '-f', formatB], { reject: false })
        expect(stderr.length).toBe(0)
      })
    }
  }
})
