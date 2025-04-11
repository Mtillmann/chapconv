# chapconv

Convert chapters between different formats. See [@mtillmann/chapters](https://github.com/Mtillmann/chapters) for details on the supported formats.

## Installation

```bash
npm install -g @mtillmann/chapconv
# then use
chapconv --help
```

or use the npx command to run the tool without installation:

```bash
npx @mtillmann/chapconv@latest --help
```

## convert
```text
Usage: chapconv convert [options]

Convert input to given format

Options:
  -V, --version             output the version number
  -i, --input [input]       Input file (default: "stdin")
  -o, --output [output]     Output file (default: "stdout")
  -f, --format <format>     Output format (choices: "applechapters", "applehls",
                            "audible", "chaptersjson", "ffmetadata",
                            "matroskaxml", "mkvmergesimple", "mkvmergexml",
                            "mp4chaps", "podcastpage", "podigee", "podigeetext",
                            "podlovejson", "psc", "pyscenedetect", "scenecut",
                            "shownotes", "shutteredl", "spotifya", "spotifyb",
                            "transistorfm", "vorbiscomment", "webvtt",
                            "youtube", default: "chaptersjson")
  -p, --pretty              Pretty print output (where applicable)
  -r, --replace             replace the output file if it exists
  --input-format <format>   Explicitly specify input format (choices:
                            "applechapters", "applehls", "audible",
                            "chaptersjson", "ffmetadata", "ffmpeginfo",
                            "matroskaxml", "mkvmergesimple", "mkvmergexml",
                            "mp4chaps", "podcastpage", "podigee", "podigeetext",
                            "podlovejson", "psc", "pyscenedetect", "scenecut",
                            "shownotes", "shutteredl", "spotifya", "spotifyb",
                            "transistorfm", "vorbiscomment", "webvtt",
                            "youtube")
  -e, --extras <extras...>  Extra output format options (key=value), see
                            https://github.com/Mtillmann/chapters?tab=readme-ov-file#chapterjson-tostring-options
  -h, --help                display help for command
```

## detect
```text
Usage: chapconv detect [options]

Detect format of input

Options:
  -i, --input [input]  Input file (default: "stdin")
  -h, --help           display help for command
```

## reading and writing

```bash
chapconv convert < input.xml > output.json
# or
chapconv convert -o output.json < input.xml
# or
cat input.xml | chapconv convert > output.json
# or
cat input.xml | chapconv convert -o output.json
# or
chapconv convert -i input.xml > output.json
# or
chapconv convert -i input.xml -o output.json
```
