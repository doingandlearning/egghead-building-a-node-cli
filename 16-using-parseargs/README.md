## quizme

A CLI tool that will help to test knowledge.

```sh
quizme
```

- Ask a question
- Evaluate answer or have me self-evaluate
- Log the results

```sh
quizme --add
```

- Start a dialogue
- Ask me for a question
- Ask me for the answer 
- Store for future uses


## What do I need?

- Parse arguments
- Interactive command line
- Persist my data - using JSON
	- Reading/Writing from the file system
- Global script 
- Self-evaluating or auto-evaluating

## Data Structure

id: Integer
question: String
answer: String
created: String (date)
lastAsked: String (date)
lastAnsweredCorrect: Boolean