document.addEventListener('DOMContentLoaded', () => {
    // Retrieve existing questions from localStorage or start with an empty array.
    let questions = [];
    try {
        const stored = JSON.parse(localStorage.getItem('customQuestions') || 'null');
        if (stored && Array.isArray(stored)) {
            questions = stored;
        }
    } catch (err) {
        questions = [];
    }

    // References to form inputs and buttons
    const form = document.getElementById('edit-form');
    const qInput = document.getElementById('question-input');
    const aInput = document.getElementById('A-input');
    const bInput = document.getElementById('B-input');
    const cInput = document.getElementById('C-input');
    const dInput = document.getElementById('D-input');
    const correctSelect = document.getElementById('correct-option');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const questionsContainer = document.getElementById('questions-container');
    const tempCountDisplay = document.getElementById('temp-question-count');
    const saveBtn = document.getElementById('save-questions-btn');

    // When editing a question, this holds the index of the question being edited.
    let editIndex = null;

    // map numeric select values to option letters.
    const indexToLetter = { '0': 'A', '1': 'B', '2': 'C', '3': 'D' };
    const letterToIndex = { A: '0', B: '1', C: '2', D: '3' };

    /**
     * display current list of questions into the questionsContainer,
     * its text, options and the correct answer, along with Edit and Delete buttons.
     */
    function createQuestion() {
        questionsContainer.innerHTML = '';
        // takes question and index
        questions.forEach((q, idx) => {
            const item = document.createElement('div');
            // create class name
            item.className = 'question-item';
            // build HTML for the question and its options
            const options = q.options;
            item.innerHTML = `
                <p><strong>${idx + 1}. ${q.question}</strong></p>
                <ul style="list-style-type: none; padding-left: 0; margin: 8px 0;">
                    <li>A: ${options.A}</li>
                    <li>B: ${options.B}</li>
                    <li>C: ${options.C}</li>
                    <li>D: ${options.D}</li>
                    <li><em>Correct: ${q.answer}</em></li>
                </ul>
                <div class="actions">
                    <button class="edit">Edit</button>
                    <button class=" delete">Delete</button>
                </div>
            `;
            // Attach event handlers for edit and delete
            item.querySelector('.edit').addEventListener('click', () => {
                startEditQuestion(idx);
            });
            item.querySelector('.delete').addEventListener('click', () => {
                deleteQuestion(idx);
            });
            questionsContainer.appendChild(item);
        });
        // Update temporary count text
        tempCountDisplay.textContent = `${questions.length}/10 questions added`;
    }

    // edit specific question
    function startEditQuestion(idx) {
        const q = questions[idx];
        qInput.value = q.question;
        aInput.value = q.options.A;
        bInput.value = q.options.B;
        cInput.value = q.options.C;
        dInput.value = q.options.D;
        qInput.focus()
        // resetForm()
        correctSelect.value = letterToIndex[q.answer];
        editIndex = idx;
    }

    //. deletes specific question
    function deleteQuestion(idx) {
        questions.splice(idx, 1);
        createQuestion();
        // Reset form if the deleted question was being edited
        if (editIndex === idx) {
            resetForm();
        }
    }

    
    function resetForm() {
        form.reset();
        editIndex = null;
        addUpdateBtn.textContent = 'Add Question';
    }

    // Handle form submission for adding or updating a question
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const questionText = qInput.value.trim();
        const optA = aInput.value.trim();
        const optB = bInput.value.trim();
        const optC = cInput.value.trim();
        const optD = dInput.value.trim();
        const correctVal = correctSelect.value;
        // Validate input fields
        if (!questionText || !optA || !optB || !optC || !optD) {
            alert('Please complete all fields before adding a question.');
            return;
        }
        const newQuestion = {
            question: questionText,
            options: { A: optA, B: optB, C: optC, D: optD },
            answer: indexToLetter[correctVal]
        };
        if (editIndex !== null) {
            // Update existing question
            questions[editIndex] = newQuestion;
        } else {
            // Prevent adding more than 10 questions
            if (questions.length >= 10) {
                alert('You can only add up to 10 questions.');
                return;
            }
            questions.push(newQuestion);
        }
        // Refresh the list and reset the form
        createQuestion();
        resetForm();
    });

    // Save questions to localStorage when the save button is clicked
    saveBtn.addEventListener('click', () => {
        try {
            localStorage.setItem('customQuestions', JSON.stringify(questions));
            alert('Questions saved successfully!');
        } catch (err) {
            alert('An error occurred while saving your questions.');
        }
    });

    // Initialize the page by rendering any existing questions
    createQuestion();
});