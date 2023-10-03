const app = require("./app");
const dev = require("./config/config");
const port = 3000;
app.listen(port, () => {
  // console.log(dev.db)
  console.log(`server is running at http://localhost:${port}`);
});
