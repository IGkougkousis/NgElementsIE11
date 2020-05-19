const fs = require("fs-extra");
const concat = require("concat");
const path = require("path");

const cmdArgs = process.argv.slice(2);
console.log("\nArguments for concat-scripts.js: " + cmdArgs);

if (cmdArgs.length === 0)
  throw "You must provide the project name as a parameter";

if(cmdArgs[0] == null)
  throw "You must provide a valid project name as a parameter";

const element = cmdArgs[0];
const ngDistDir = path.join(__dirname, "dist", element);
const elementsDir = path.join(__dirname, "compiled-elements");

const files = [
  "runtime.js",
  "polyfills-es5.js",
  "styles.js",
  "scripts.js",
  "main.js",
].map((f) => path.join(ngDistDir, f));

(async function () {
  await fs.ensureDir(ngDistDir);
  await fs.ensureDir(elementsDir);
  await concat(files, path.join(elementsDir, element + ".js"));
  await fs.remove(path.join(__dirname, "dist"));
})();

console.log("Finished concat-scripts.js for " + element);
