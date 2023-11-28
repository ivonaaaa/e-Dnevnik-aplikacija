//ovdje se piše kod
function ispravno(email) {
    return email.includes('@');
}

function naslovna() {
    // Get values from input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('Unesite email i lozinku.');
    } else if (!ispravno(email)) {
        alert('Unesite ispravnu email addresu.');
    } else {
        //alert('Dobrodošli!');
        window.location.href='ocjene.html';
    }
}

function ocjene() {
    window.location.href='ocjene.html';
}

function podaci() {
    window.location.href='podaci.html';
}

function odjava() {
    window.location.href = 'prijava.html';
}

function ispiti() {
    window.location.href = 'ispiti.html';
}

function izostanci() {
    window.location.href = 'izostanci.html';
}

function biljeske() {
    window.location.href = 'biljeske.html';
}

function predmet() {
    window.location.href = 'predmet.html';
}

const exams = [
    { name: 'Ispit 1', date: new Date('2023-10-10') },
    { name: 'Ispit 2', date: new Date('2023-11-20') },
    { name: 'Ispit 3', date: new Date('2023-12-05') },
    { name: 'Ispit 4', date: new Date('2023-12-15') },
    { name: 'Ispit 5', date: new Date('2024-01-10') },
];

function showExams(period) {
    const selectedMonth = document.getElementById('months').value;
    const currentDate = new Date();

    let filteredExams;
    if (period === 'past') {
        filteredExams = exams.filter(exam => exam.date < currentDate);
    } else if (period === 'current') {
        filteredExams = exams.filter(exam => {
            const examMonth = exam.date.getMonth() + 1; // Mjeseci su 0-indeksirani, stoga dodajemo 1
            const currentMonth = currentDate.getMonth() + 1;
            return exam.date.getFullYear() === currentDate.getFullYear() && examMonth === currentMonth;
        });
    } else if (period === 'future') {
        filteredExams = exams.filter(exam => exam.date > currentDate);
    } else {
        // Filtriraj prema odabranom mjesecu
        filteredExams = exams.filter(exam => {
            const examMonth = exam.date.getMonth() + 1;
            return examMonth === parseInt(selectedMonth, 10);
        });
    }

    displayExams(filteredExams);
}

// Prikazi tekuće ispite kao zadani pri pokretanju stranice
window.onload = function() {
    showExams('current');
};

function displayExams(exams) {
    const examsContainer = document.getElementById('exams-container');
    examsContainer.innerHTML = '';

    if (exams.length === 0) {
        examsContainer.innerHTML = '<p>Nema dostupnih ispita u odabranom razdoblju.</p>';
        return;
    }

    const ul = document.createElement('ul');
    exams.forEach(exam => {
        const li = document.createElement('li');
        li.textContent = `${exam.name} - ${exam.date.toDateString()}`;
        ul.appendChild(li);
    });

    examsContainer.appendChild(ul);
}

// Prikazi tekuće ispite kao zadane pri pokretanju
showExams('current');
