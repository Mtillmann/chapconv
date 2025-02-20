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
{convert-usage}```

## detect
```text
{detect-usage}```

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
