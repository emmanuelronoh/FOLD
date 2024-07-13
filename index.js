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
            case 'c#':
                info = "C# is a modern, general-purpose programming language developed by Microsoft. It is widely used for building applications on the .NET framework.";
                break;
            case 'c++':
                info = "C++ is a powerful, general-purpose programming language created as an extension of the C programming language. It is used for system/application software, game development, drivers, and more.";
                break;
            case 'ruby':
                info = "Ruby is a dynamic, reflective, object-oriented programming language known for its simplicity and productivity. It is used primarily for web development and prototyping.";
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


