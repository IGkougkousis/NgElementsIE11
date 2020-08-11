const express = require("express");
const path = require("path");

const cmdArgs = process.argv.slice(2);
let element = null;
try {
  element = cmdArgs[0];
  if (element == null) throw "You have provided no element to test... Shame";
} catch (e) {
  console.log("Could not start dev server\n" + e);
  return;
}

const app = express();
const port = process.env.PORT || 53218;

app.use("/", express.static(path.join(__dirname, "compiled-elements")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "devindex.html"));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
