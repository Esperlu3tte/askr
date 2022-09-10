const { resolve } = require("node:path");
const { loadSync: fontLoadSync } = require("opentype.js");
const { exporter: { toSVG }, models: { Text } } = require("makerjs");

const font = fontLoadSync(resolve(__dirname, "fonts/arial-unicode-ms.ttf"));

function fromBase64Source(src) {
  return Buffer.from(src, "base64").toString();
}

function fromText(text, size = 13, color = "#000000") {
  const textModel = new Text(font, text, size);
  return toSVG(textModel, {
    fill: color,
    fillRule: "evenodd",
    stroke: color,
    strokeWidth: 0,
  });
}

module.exports = {
  fromBase64Source,
  fromText,
};
