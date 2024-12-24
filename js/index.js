import quiz from "./quiz.js";
import Questions from "./questions.js";
const categoryMenu = document.getElementById("categoryMenu");
const difficultyOptions = document.getElementById("difficultyOptions");
const questionsNumber = document.getElementById("questionsNumber");
const startQuiz = document.getElementById("startQuiz");
const quizForm = document.getElementById("quizForm");

export let allQuestions;
const questionContainer = document.getElementById("questionContainer");
startQuiz.addEventListener("click", async () => {
  let myQuiz = new quiz(
    categoryMenu.value,
    difficultyOptions.value,
    questionsNumber.value
  );

  allQuestions = await myQuiz.getQuizData();
  quizForm.classList.add("d-none");
  questionContainer.classList.replace("d-none", "d-block");
  let myQuestion = new Questions(0);
  myQuestion.displayQuestion();
});
