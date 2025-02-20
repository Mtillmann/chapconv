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
  for (const [file, format] of formats) {
    it(`detects ${file} as ${format}`, () => {
      const { stdout } = execaSync('node', ['./index.js', 'detect', '-i', filePrefix + file], { reject: false })
      expect(stdout).toEqual(format)
    })
  }
})
