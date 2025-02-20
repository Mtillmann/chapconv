import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

let template = readFileSync('readme.template.md', 'utf-8')

const helpConvOpt = execSync('node index.js help convert', { encoding: 'utf-8' })
const helpDetectOpt = execSync('node index.js help detect', { encoding: 'utf-8' })

template = template.replace('{convert-usage}', helpConvOpt.replace('index', 'chapconv'))
template = template.replace('{detect-usage}', helpDetectOpt.replace('index', 'chapconv'))

writeFileSync('readme.md', template)
