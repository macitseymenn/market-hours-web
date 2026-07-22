/**
 * Serialize a structured-data object for injection into a
 * `<script type="application/ld+json">` block.
 *
 * `JSON.stringify` does NOT escape `<`, so a value containing `</script>` or
 * `<!--` could break out of the script context. Every object we inject is
 * author-controlled today, but escaping removes the bug class for good and
 * protects future edits where blog/author data flows into JSON-LD.
 *
 * Escaping `<`/`>`/`&` keeps the output valid JSON to Google's parser; the
 * U+2028 / U+2029 replacements avoid a JS string-literal parse edge case.
 * We build those two matchers from char codes so no raw line-separator code
 * point ever appears in this source file (they are JS line terminators and
 * would break a regex literal).
 */
const LINE_SEP = new RegExp(String.fromCharCode(0x2028), "g");
const PARA_SEP = new RegExp(String.fromCharCode(0x2029), "g");

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(LINE_SEP, "\\u2028")
    .replace(PARA_SEP, "\\u2029");
}
