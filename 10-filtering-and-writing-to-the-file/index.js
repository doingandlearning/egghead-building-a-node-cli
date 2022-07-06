import inquirer from "inquirer";
import fs from "node:fs/promises";
import { isBoxedPrimitive } from "node:util/types";

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

async function askQuestion() {
  const data = await fs.readFile("./data.json");
  const parsedData = JSON.parse(data.toString());

  const target = parsedData[0];

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

function checkAnswer(input, answer) {
  if (input === answer) {
    console.log("That's right!");
    return true;
  } else {
    console.log("Not this time!");
    return false;
  }
}
