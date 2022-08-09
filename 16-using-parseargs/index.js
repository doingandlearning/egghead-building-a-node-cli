#! /usr/bin/env node

import inquirer from "inquirer";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parseArgs } from "node:util";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFile = join(__dirname, "data.json");

const options = { add: { type: "boolean", short: "a" } };

const {
  values: { add },
} = parseArgs({ options });

if (add) {
  addQuestion();
} else {
  askQuestion();
}

async function askQuestion() {
  const data = await fs.readFile(dataFile);
  const parsedData = JSON.parse(data.toString());

  const target = parsedData[Math.floor(Math.random() * parsedData.length)];

  const { question, answer } = target;

  const answers = await inquirer.prompt([
    { type: "input", name: "useranswer", message: question },
  ]);

  target.lastAnsweredCorrect = checkAnswer(answers.useranswer, answer);
  target.lastAsked = Date().toString();

  const newData = parsedData.filter((item) => item.id !== target.id);
  newData.push(target);

  await fs.writeFile(dataFile, JSON.stringify(newData));
}

async function checkAnswer(input, answer) {
  console.log(`You answered: ${input}.`);
  console.log(`The actual answer is: ${answer}.`);

  const response = await inquirer.prompt([
    { message: "Did you get it right?", name: "correct", type: "confirm" },
  ]);

  return response.correct;
}

async function addQuestion() {
  console.log("Hello, let's add a new question!");
  const responses = await inquirer.prompt([
    {
      type: "input",
      name: "targetquestion",
      message: "What is your question?",
    },
    { type: "input", name: "targetanswer", message: "What is your answer?" },
  ]);

  const data = await fs.readFile(dataFile);
  const parsedData = JSON.stringify(data.toString());

  parsedData.push({
    id: getId(parsedData),
    question: responses.targetquestion,
    answer: responses.targetanswer,
  });

  await fs.writeFile(dataFile, JSON.stringify(parsedData));

  console.log("All added!");
}

function getId(data) {
  return Math.max(...data.map((item) => item.id)) + 1;
}
