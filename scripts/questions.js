export async function loadQuestions() {
    const url = 'https://opentdb.com/api.php?amount=50&category=31&difficulty=easy&type=multiple';

    const response = await fetch(url);
    const data = await response.json();

    // gets questions
    const questions = [...data.results];

    // Fisher-Yates shuffle
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // // shuffle questions
    // shuffle(questions);

    // converts HTML entities &quot;, &amp into readable characters
    function decodeHTML(str) {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }

    shuffle(questions);
    
    // default number of questions
    let numOfQuestions = 10;
    let formattedQuestions = [];

    // loop through desired number of questions
    for (let i = 0; i < numOfQuestions; i++){
        let q = questions[i];
        // combine correct and incorrect answers
        let decodedAnswers = [];

        // decode each incorrect answer and push to array
        for (let i = 0; i < q.incorrect_answers.length; i++) {
            decodedAnswers.push(decodeHTML(q.incorrect_answers[i]));
        }

        // add the correct answer
        decodedAnswers.push(decodeHTML(q.correct_answer));

        // shuffle answers array
        let shuffled = shuffle(decodedAnswers);


        // assign answers to btnA-D
        let options = {
            A: shuffled[0],
            B: shuffled[1],
            C: shuffled[2],
            D: shuffled[3]
        };

        let correctAnswerText = decodeHTML(q.correct_answer);
        let answerKey = null;

        for (let letter in options) {
            if (options[letter] === correctAnswerText) {
                answerKey = letter;
                break;
            }
        }
        // store a fully structured question object
        formattedQuestions.push({
            question: decodeHTML(q.question),
            options: options,
            answer: answerKey
        });
    }
    return formattedQuestions;
}
