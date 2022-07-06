// First half of the video

// import readline from "node:readline";

// const rl = readline.createInterface({
//   terminal: true,
//   input: process.stdin,
//   output: process.stdin,
// });

// console.log("What is your name?");

// let input = "";

// rl.input.on("keypress", (event, rl) => {
//   if (rl.name === "return") {
//     console.log(`Your name is ${input}.`);
//     console.log("Where do you live?");
//   } else {
//     input += event;
//   }
// });

// Second half of the video

import readline from "node:readline/promises";

const rl = readline.createInterface({
  terminal: true,
  input: process.stdin,
  output: process.stdin,
});

const answer = await rl.question("What is your name?");
console.log(`Your name is ${answer}.`);

rl.close();

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
