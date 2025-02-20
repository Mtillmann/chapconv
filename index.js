#!/usr/bin/env node

import { program, Option } from 'commander'
import { AutoFormat } from '@mtillmann/chapters'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import { dirname, sep } from 'path'
import { fileURLToPath } from 'url'

const formats = Object.keys(AutoFormat.classMap).sort()
const formatsWithoutFFmpegInfo = formats.filter(f => f !== 'ffmpeginfo')

const packageJSON = JSON.parse(readFileSync(dirname(fileURLToPath(import.meta.url)) + sep + 'package.json', 'utf-8'))

program
  .command('convert')
  .version(packageJSON.version)
  .description('Convert input to given format')
  .addOption(new Option('-i, --input [input]', 'Input file').default('stdin'))
  .addOption(new Option('-o, --output [output]', 'Output file').default('stdout'))
  .addOption(new Option('-f, --format <format>', 'Output format').choices(formatsWithoutFFmpegInfo).default('chaptersjson'))
  .addOption(new Option('-p, --pretty', 'Pretty print output (where applicable)'))
  .addOption(new Option('-r, --replace', 'replace the output file if it exists'))
  .addOption(new Option('--input-format <format>', 'Explicitly specify input format').choices(formats))
  .addOption(new Option('-e, --extras <extras...>', 'Extra output format options (key=value), see https://github.com/Mtillmann/chapters?tab=readme-ov-file#chapterjson-tostring-options'))
  .action((options) => {
    let input

    const extras = options.extras?.reduce((acc, curr) => {
      const [key, value] = curr.split('=')
      acc[key] = value
      return acc
    }, {}) || {}

    if (options.input === 'stdin') {
      input = readFileSync(0, 'utf-8')
    } else {
      input = readFileSync(options.input, 'utf-8')
    }

    let output
    try {
      if (options.inputFormat) {
        output = AutoFormat.as(options.inputFormat, input)
      } else {
        output = AutoFormat.from(input)
      }
      output = output.to(AutoFormat.classMap[options.format]).toString(options.pretty, extras)
    } catch (e) {
      console.log(e)
      process.exit(1)
    }

    if (options.output === 'stdout') {
      process.stdout.write(output)
    } else {
      if (existsSync(options.output) && !options.replace) {
        console.error(`Output file ${options.output} exists. Use --replace to overwrite.`)
        process.exit(1)
      }
      writeFileSync(options.output, output)
    }
  })

program.command('detect')
  .description('Detect format of input')
  .addOption(new Option('-i, --input [input]', 'Input file').default('stdin'))
  .action((options) => {
    let input

    if (options.input === 'stdin') {
      input = readFileSync(0, 'utf-8')
    } else {
      input = readFileSync(options.input, 'utf-8')
    }

    let output
    try {
      output = AutoFormat.detect(input, 'key').toString()
    } catch (e) {
      console.log(e)
      process.exit(1)
    }

    process.stdout.write(output)
  })

program.parse()
