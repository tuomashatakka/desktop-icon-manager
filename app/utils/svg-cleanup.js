
const MATCH_STYLE_ATTR = /\s+(class|style|fill|stroke)\s*=\s*(\"|\')(.*?)([^\\]\2)/img //(?:\s+|\n|>|\/)
const MATCH_TAG = /[^\\]<(\w+)(?:\s|\n)/img

export default function (source) {
  return source
    .replace(MATCH_STYLE_ATTR, '')
    .replace(MATCH_TAG, (_) => _ + 'fill="currentColor"')
}
