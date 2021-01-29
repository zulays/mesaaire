#!/usr/bin/env node

require("dotenv").config();
const fs = require("fs");
const { prompt } = require("inquirer");

const template = fs.readFileSync(__dirname + "/.env.template", "UTF-8");

prompt([
  {
    type: "input",
    message: "what is your airtable base?",
    name: "BASE",
    default: null,
  },
  {
    type: "input",
    message: "what is your airtable key?",
    name: "key",
    default: null,
    when: !process.env.KEY
  },
  {
    type: "list",
    message: "what environment is this meant for?",
    name: "environment",
    default: "development",
    choices: ["development", "production", "test"],
  },
]).then(({ BASE, environment, key }) => {
  //current working directory
  const cwd = process.cwd();
  const KEY = process.env.KEY || key;
  console.log(KEY)
  const newEnv = template.replace("[BASE]", BASE).replace("[KEY]", KEY);
  `${cwd}/.env.${environment}.local`;
  fs.writeFileSync(`${cwd}/.env.${environment}.local`, newEnv);
  console.log(`new ${environment} .env created at ${cwd}/.env.${environment}.local`);
});
