import {franc, francAll} from 'franc'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const langs = require("langs")
const colors = require("colors")

// process.exit() // this command is used to stop all code in this file

const text = process.argv.slice(2)[0]
try {
    let langCode = franc(text)
    let langObj = langs.where("3", langCode)
    console.log(langObj.name.green)    
} catch(e) {
    console.log("Unable to determine language. Try entering longer sentences\n".red, e)
}