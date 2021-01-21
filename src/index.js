#!/usr/bin/env node

require('dotenv').config()
const fs = require("fs")
const {prompt} = require("inquirer")

const template = fs.readFileSync(__dirname+"/.env.template", "UTF-8")

prompt([{
  type: "input",
  message: "what is your airtable base?",
  name: "BASE",
  default: null,

}]).then(({ BASE }) => {
  //current working directory
  const cwd = process.cwd()
  const { KEY } = process.env
  const newEnv = template.replace("[BASE]", BASE).replace("[KEY]", KEY) 
  fs.writeFileSync(cwd + "/.env.development.local", newEnv)
  console.log("new .env written to " + cwd + "/.env.development.local")
})  