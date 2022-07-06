// Option 1 - Synchronously

// import fs from "fs";

// const contents = fs.readFileSync("./data.json");
// console.log(contents.toString());

// Option 2 - With a callback

// import fs from "fs";

// fs.readFile("./data.json", (error, contents) => {
//   if (error) {
//     console.log(error);
//     process.exit(1);
//   }
//   console.log(JSON.parse(contents.toString()));
// });

// Option 3 - with a promise

const contents = await fs.readFile("./data.json");
console.log(JSON.parse(contents.toString()));
