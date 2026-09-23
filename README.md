# Trivia Quiz

A simple 10-question quiz built with React.

**[Live demo](https://trivia-quiz-alpha-nine.vercel.app)**

## Features
- Random questions from the Open Trivia DB API
- One question on screen at a time
- You have to pick an answer before moving on
- Summary at the end with your score and the correct answers
- Answers are shuffled, so the correct one isn't always in the same spot

## Built with
- React
- Vite
- CSS

## What I learned
- How to decode HTML entities from an API response
- Why shuffling has to happen before saving to state, not during render

## Running locally

```bash
git clone https://github.com/SlaySlash/trivia-quiz
cd trivia-quiz
npm install
npm run dev
```

Create a `.env` file in the root:
VITE_QUIZ_URL=https://opentdb.com/api.php?amount=10