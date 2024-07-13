document.addEventListener('DOMContentLoaded', function() {
    const topics = document.querySelectorAll('.sidebar ul li');
    const infoDisplay = document.getElementById('infoDisplay');
    const addQuestionForm = document.getElementById('addQuestionForm');
    const answerQuestionForm = document.getElementById('answerQuestionForm');
    const quizDisplay = document.getElementById('quizDisplay');

    topics.forEach(topic => {
        topic.addEventListener('click', function() {
            const topicName = this.getAttribute('data-topic');
            showInfo(topicName);
        });
    });

    addQuestionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const questionInput = document.getElementById('question');
        const answerInput = document.getElementById('answer');
        const topicSelect = document.getElementById('topic');
        const question = questionInput.value.trim();
        const answer = answerInput.value.trim();
        const topic = topicSelect.value;

        if (question && answer && topic) {
            addQuestionToDB(question, answer, topic);
            questionInput.value = '';
            answerInput.value = '';
        } else {
            alert('Please enter question, answer, and select a topic.');
        }
    });

    answerQuestionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const studentAnswerInput = document.getElementById('studentAnswer');
        const studentAnswer = studentAnswerInput.value.trim();

        if (studentAnswer) {
            displayStudentAnswer(studentAnswer);
            studentAnswerInput.value = '';
        } else {
            alert('Please enter your answer.');
        }
    });

    function showInfo(topic) {
        let info;

        switch (topic) {
            case 'csharp':
                info = "C# is a modern, general-purpose programming language developed by Microsoft. It is widely used for building applications on the .NET framework.";
                break;
            case 'cplusplus':
                info = "C++ is a powerful, general-purpose programming language created as an extension of the C programming language. It is used for system/application software, game development, drivers, and more.";
                break;
            case 'ruby':
                info = "Ruby is a dynamic, reflective, object-oriented programming language known for its simplicity and productivity. It is used primarily for web development and prototyping.";
                break;
            case 'questions':
                info = "This section is for creating and managing quiz questions.";
                break;
            default:
                info = 'Click on a topic to see information here.';
        }

        infoDisplay.innerHTML = info;
    }

    function addQuestionToDB(question, answer, topic) {
        const formData = {
            question: question,
            answer: answer,
            topic: topic
        };

        fetch('http://localhost:3000/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Question added successfully:', data);
            loadQuestions();
        })
        .catch(error => {
            console.error('Error adding question:', error);
            alert('Failed to add question. Please try again.');
        });
    }

    function displayStudentAnswer(answer) {
        const answerElement = document.createElement('p');
        answerElement.textContent = answer;
        quizDisplay.appendChild(answerElement);
    }

    function loadQuestions() {
        fetch('http://localhost:3000/questions')
            .then(response => response.json())
            .then(data => {
                quizDisplay.innerHTML = '';
                data.forEach(question => {
                    const questionElement = document.createElement('div');
                    questionElement.classList.add('question-item');
                    questionElement.innerHTML = `
                        <h3>${question.question}</h3>
                        <p><strong>Answer:</strong> ${question.answer}</p>
                        <p><strong>Topic:</strong> ${question.topic}</p>
                    `;
                    quizDisplay.appendChild(questionElement);
                });
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });
    }

    loadQuestions();
});
