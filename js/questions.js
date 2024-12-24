import { allQuestions } from "./index.js";
const questionContainer = document.getElementById("questionContainer");
let correctAnswer = 0;
export default class Questions {
  constructor(index) {
    this.index = index;

    this.category = allQuestions[this.index].category;

    this.length = allQuestions.length;

    this.question = allQuestions[this.index].question;

    this.correct = allQuestions[this.index].correct_answer;
    this.incorrect = allQuestions[this.index].incorrect_answers;

    this.allChoices = [this.correct, ...this.incorrect].sort();
    this.answered = 0;
  }

  displayQuestion() {
    let container = ` <div class="question bg-white p-3 mb-5 rounded-2 animate__animated animate__bounceIn">
     <div class="questionHeader d-flex justify-content-between mb-3">
                <div class="questionCategory">
                  <span class="rounded-2 px-3 py-1">${this.category}</span>
                </div>
                <div class="noOfQuestion">
                  <span class="rounded-2 px-3 py-1">${this.index + 1} of ${
      this.length
    } Questions</span>
                </div>
              </div>
              <div class="theQuestion mb-3">
                <p class="h4 text-center">${this.question}</p>
              </div>
              <ul class="list-unstyled w-100 text-center d-flex flex-wrap">
               ${this.allChoices.map((choice) => `<li>${choice}</li>`).join("")}
              </ul>
              <h2 class="text-capitalize text-center score-color h3 fw-bold">
                <i class="fa-regular fa-face-laugh-beam"></i> Score: ${correctAnswer}
              </h2> 
              </div>`;
    questionContainer.innerHTML = container;

    let allAnswers = document.querySelectorAll("ul li");
    allAnswers.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.checkAnswer(e.target);
      });
    });
  }
  checkAnswer(answer) {
    if (this.answered) {
      return;
    }
    if (answer.innerHTML == this.correct) {
      answer.classList.add("correct");
      correctAnswer++;
    } else {
      answer.classList.add("wrong");
    }
    this.index++;
    this.answered = 1;
    this.animateQuestion(answer);
    setTimeout(() => this.nextQuestion(), 500);
  }
  animateQuestion(element) {
    element.closest(".question").classList.remove("animate__bounceIn");
    element.closest(".question").classList.add("animate__bounceOutLeft");
  }

  nextQuestion() {
    if (this.index < this.length) {
      let nextQuestion = new Questions(this.index);
      nextQuestion.displayQuestion();
    } else {
      questionContainer.innerHTML = `<div class="tryAgain text-center text-white mb-6 animate__animated animate__bounceInUp">
              <p class="h1">your score is ${correctAnswer}</p>
              <button id="btnTry" class="btn btn-danger">try again</button>
            </div>`;
      const btnTry = document.getElementById("btnTry");
      btnTry.addEventListener("click", () => {
        window.location.reload();
      });
    }
  }
}
