"use strict";

import { trivia } from "./trivia.js";

const getElement = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {

    const question = getElement("#p");
    const startBtn = getElement("#start");
    const resetBtn = getElement("#reset");
    const timerText = getElement("#timer");
    const questionsLeft = getElement("#questionsLeft");
    const scoreDisplay = getElement("#score");


    let btnA = getElement("#button-A");
    let btnB = getElement("#button-B");
    let btnC = getElement("#button-C");
    let btnD = getElement("#button-D");

    // let questions = [];
    let currentQuestions = []
    let numberOfQuestions = 10;
    let score = 0;
    let currentIndex = 0;
    let timerInterval;
   
   

    // Fisher Yates Shuffle Algorithm - ensure random questions each game
    function getRandomQuestions() {

        // create copy of trivia obj then suffle
        const shuffled = [...trivia]

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, numberOfQuestions);
    }

    //  fixed bug
    function updateQuestionsLeft() {
      questionsLeft.textContent = numberOfQuestions - currentIndex;
    }
    

    function quizTimer(){
        clearInterval(timerInterval);

        let timeLeft = 10;
        timerText.textContent = timeLeft;

        //need to reset timeLeft when next question loads
        timerInterval = setInterval(() => {
            timeLeft-- 

            // question timer
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                currentIndex++ // next question
                nextQuestion(); //update UI
                return;
            } 

            timerText.textContent = timeLeft;
        }, 1000);
    }

    function calculateScore() {
        const buttons = [btnA, btnB, btnC, btnD];

        buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const userChoice = e.target.textContent;
                
                const answerKey = currentQuestions[currentIndex].answer;
                const correctAnswer = currentQuestions[currentIndex].options[answerKey];

                if (userChoice === correctAnswer) {
                    score++;
                }

                currentIndex++
                nextQuestion();
            });
        });
    }

    function updateScoreDisplay() {
        scoreDisplay.textContent = score;
    } 

    function startQuiz() {

     // Reset
        currentQuestions = getRandomQuestions();
        currentIndex = 0;
        score = 0;

        updateScoreDisplay();

        // Load first question
        nextQuestion();
        updateQuestionsLeft();
        quizTimer();
        calculateScore();
    }

    // need to fix next question function to loop through all questions
    function nextQuestion() {
        if (currentIndex >= currentQuestions.length){
            clearInterval(timerInterval);
            question.textContent = `Quiz over! Final Score: ${score}/${numberOfQuestions}`
            return;
        }
        // let question = currentQuestions[currentIndex]
        
        const currentQuestion = currentQuestions[currentIndex];

        question.textContent = currentQuestion.question;
        btnA.textContent = currentQuestion.options.A;
        btnB.textContent = currentQuestion.options.B;
        btnC.textContent = currentQuestion.options.C;
        btnD.textContent = currentQuestion.options.D; 
        
        updateQuestionsLeft();
        quizTimer();
        updateScoreDisplay();
    }

    function resetQuiz() {
        clearInterval(timerInterval);

        currentIndex = 0;
        score = 0;
   
        // reset dispaly text
        question.textContent = "Press Start to begin the quiz!";
        btnA.textContent = "A";
        btnB.textContent = "B";
        btnC.textContent = "C";
        btnD.textContent = "D";

        scoreDisplay.textContent = "0"
        timerText.textContent = "10";
        questionsLeft.textContent = numberOfQuestions;

    }

    startBtn.addEventListener("click", startQuiz);

    resetBtn.addEventListener("click", resetQuiz);
})