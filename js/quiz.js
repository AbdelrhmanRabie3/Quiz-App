export default class quiz {
  constructor(category, difficulty, amount) {
    this.category = category;
    this.difficulty = difficulty;
    this.amount = amount;
  }
  async getQuizData() {
    let quizData = await fetch(
      `https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}`
    );
    let data = await quizData.json();
    return data.results;
  }
}
