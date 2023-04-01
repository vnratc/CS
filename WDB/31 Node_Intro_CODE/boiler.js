import { mkdirSync, writeFileSync } from 'node:fs';


// Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
// mkdir('MacBook', { recursive: true }, (err) => {
//   console.log("Directory created")
//   if (err) throw err;
// });

// const fs = require("fs");
const folderName = process.argv[2] || "Project";

try {
    mkdirSync(folderName);
    writeFileSync(`${folderName}/index.html`, "");
    writeFileSync(`${folderName}/script.js`, "");
    writeFileSync(`${folderName}/styles.css`, "body {\n    background-color: red\n}");
} catch(e) {
    console.log("Error\n", e)
}