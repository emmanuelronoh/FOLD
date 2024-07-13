document.addEventListener('DOMContentLoaded', function() {
    const topics = document.querySelectorAll('.sidebar ul li');
    const infoDisplay = document.getElementById('infoDisplay');
    const quizForm = document.getElementById('quizForm');

    topics.forEach(topic => {
        topic.addEventListener('click', function() {
            const topicName = this.getAttribute('data-topic');
            showInfo(topicName);
        });
    });

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const questionInput = document.getElementById('question');
        const answerInput = document.getElementById('answer');
        const question = questionInput.value.trim();
        const answer = answerInput.value.trim();

        if (question && answer) {
            addQuestionToDB(question, answer);
            questionInput.value = '';
            answerInput.value = '';
        } else {
            alert('Please enter both question and answer.');
        }
    });

    function showInfo(topic) {
        let info;

        switch (topic) {
            case 'python':
                info = "Python is a high-level, interpreted programming language known for its simplicity and readability. It supports multiple programming paradigms and is widely used for web development, data analysis, AI, scientific computing, and automation.";
            case 'Java':
                info = "Java is a versatile, object-oriented programming language known for its platform independence and robustness. It's widely used for building enterprise-scale applications, mobile apps (Android), web servers, and more.";
                break;
            case 'questions':
                info = "This section is for creating and managing quiz questions. Functionality for this feature will be implemented separately.";
                break;
            default:
                info = 'Click on a topic to see information here.';
        }

        infoDisplay.innerHTML = info;
    }

    function addQuestionToDB(question, answer) {
        const formData = {
            question: question,
            answer: answer
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
        })
        .catch(error => {
            console.error('Error adding question:', error);
            alert('Failed to add question. Please try again.');
        });
    }
});


