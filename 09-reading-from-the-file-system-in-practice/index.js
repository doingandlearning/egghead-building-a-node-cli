import inquirer from "inquirer";
import fs from "node:fs/promises";

const flags = [];
process.argv.forEach((arg) => {
  if (/^-/.test(arg)) {
    flags.push(arg.replaceAll("-", ""));
  }
});

console.log(flags);

if (flags.includes("a") || flags.includes("add")) {
  addQuestion();
} else {
  askQuestion();
}

console.log(process.argv);

// Before refactor:

// async function askQuestion() {
//   const question = "What country has more pyramids than any other?";
//   const answer = "Sudan";

//   const answers = await inquirer.prompt([
//     { type: "input", name: "pyramid", message: question },
//   ]);

//   if (answers.pyramid === answer) {
//     console.log("That's right!");
//   } else {
//     console.log("Not this time!");
//   }
// }

// After refactor

async function askQuestion() {
  const data = await fs.readFile("./data.json");
  const parsedData = JSON.parse(data.toString());

  const { question, answer } = parsedData[0];

  const answers = await inquirer.prompt([
    { type: "input", name: "answer", message: question },
  ]);

  if (answers.answer === answer) {
    console.log("That's right!");
  } else {
    console.log("Not this time!");
  }
}
