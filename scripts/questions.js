export async function loadQuestions() {
    const url = 'https://opentdb.com/api.php?amount=50&category=31&difficulty=easy&type=multiple';

    const response = await fetch(url);
    const data = await response.json();

    // gets questions
    const questions = [...data.results];
    
    // Fisher-Yates shuffle
    function shuffle(array){
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // shuffle questions
    shuffle(questions);

    // default number of questions
    let numOfQuestions = 10;

    for(let i = 0; i < numOfQuestions; i++){
    let question = questions[i];
    let question_options = shuffle([...question.incorrect_answers, question.correct_answer]);

    console.log(`Question ${i + 1} : ${question.question}\nOptions: ${question_options.join(", ")}\n`);
  }
}

loadQuestions();