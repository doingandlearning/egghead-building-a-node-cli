const flags = [];

process.argv.forEach((arg) => {
  if (/^-/.test(arg)) {
    flags.push(arg.replaceAll("-", ""));
  }
});

console.log(flags);

if (flags.includes("a") || flags.includes("add")) {
  console.log("add some values");
} else {
  console.log("Do some work");
}

console.log(process.argv);
