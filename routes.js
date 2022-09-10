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

router.on("GET", "/svg", (req, res, _params, _store, { text, size, color }) => {
  if (!text
    || size && !validator.isInt(size, { min: 1, max: 2000 })
    || color && !validator.isHexColor(color)
  ) {
    return unprocessableEntityError(res);
  }

  const svg = fromText(text, size, color ? color[0] === "#" ? color : `#${color}` : undefined);
  if (!svg) {
    return unprocessableEntityError(res);
  }

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", `max-age=${7 * 24 * 60 * 60}, stale-while-revalidate=${1 * 24 * 60 * 60}`);
  return res.end(svg);
});

module.exports = {
  router,
};
