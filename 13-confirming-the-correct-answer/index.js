import inquirer from "inquirer";
import fs from "node:fs/promises";
import { isBoxedPrimitive } from "node:util/types";

const flags = [];
process.argv.forEach((arg) => {
  if (/^-/.test(arg)) {
    flags.push(arg.replaceAll("-", ""));
  }
});

if (flags.includes("a") || flags.includes("add")) {
  addQuestion();
} else {
  askQuestion();
}

async function askQuestion() {
  const data = await fs.readFile("./data.json");
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

  await fs.writeFile("./data.json", JSON.stringify(newData));
}

// // Approach 1
// function checkAnswer(input, answer) {
//   if (input === answer) {
//     console.log("That's right!");
//     return true;
//   } else {
//     console.log("Not this time!");
//     return false;
//   }
// }

// // Approach 2
// function checkAnswer(input, answer) {
//   if (
//     input.split(" ").join(" ").toLowerCase() ===
//     answer.split(" ").join(" ").toLowerCase()
//   ) {
//     console.log("That's right!");
//     return true;
//   } else {
//     console.log("Not this time!");
//     return false;
//   }
// }

// Approach 3
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

  const data = await fs.readFile("./data.json");
  const parsedData = JSON.stringify(data.toString());

  parsedData.push({
    id: getId(parsedData),
    question: responses.targetquestion,
    answer: responses.targetanswer,
  });

  await fs.writeFile("./data.json", JSON.stringify(parsedData));

  console.log("All added!");
}

function getId(data) {
  return Math.max(...data.map((item) => item.id)) + 1;
}
