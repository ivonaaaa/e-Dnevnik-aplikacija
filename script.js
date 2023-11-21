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