const buildRouter = require("find-my-way");
const validator = require("validator");
const { fromBase64Source, fromText } = require("./svg");

const router = buildRouter({
  defaultRoute: (req, res) => {
    res.writeHead(404);
    res.end();
  },
});

function unprocessableEntityError(res) {
  res.writeHead(422);
  return res.end();
}

router.on("GET", "/svg", (req, res, _params, _store, { src, text, size, color }) => {
  let svg;
  if (src) {
    if (!validator.isBase64(src)) {
      return unprocessableEntityError(res);
    }
    svg = fromBase64Source(src);
  } else if (text) {
    if (size && !validator.isInt(size, { min: 1, max: 2000 })
      || color && !validator.isHexColor(color)
    ) {
      return unprocessableEntityError(res);
    }
    svg = fromText(text, size, color ? color[0] === "#" ? color : `#${color}` : undefined);
  }

  if (!svg) {
    return unprocessableEntityError(res);
  }

  res.setHeader('Content-Type', "image/svg+xml");
  return res.end(svg);
});

module.exports = {
  router,
};
