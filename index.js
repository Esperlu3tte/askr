const { createServer } = require("node:http");
const { router } = require("./routes");

const port = Number.parseInt(process.env.PORT || 3000);

const server = createServer((req, res) => {
  router.lookup(req, res);
});

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server listening on: http://localhost:${port}`)
});
