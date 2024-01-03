//provjera prijave korisnika tj. provjera postoji li korisnik u bazi podataka

function prijava(email, password) {
    console.log('Pozvana funkcija prijava.');
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    

    // Napravite HTTP zahtjev prema serveru
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:4000/studenti', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Pošalji podatke na server
    xhr.send(JSON.stringify({ korisnicko_ime: email, lozinka: password }));

    // Čekaj odgovor od servera
    xhr.onreadystatechange = function () {
        console.log('Promjena stanja:', xhr.readyState, xhr.status);

        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response);

                if (response.success) {
                    // Uspješna prijava, pohrani e-mail u lokalnu pohranu
                    console.log('Uspješna prijava:', response.student);
                    window.localStorage.setItem('email', email);

                   

                    // Preusmjerite korisnika na drugu stranicu ili izvršite druge radnje
                    window.location.href = 'ocjene.html';
                   
                } else {
                    // Pogrešno korisničko ime ili lozinka
                    console.error('Pogrešno korisničko ime ili lozinka:', response.message);
                    document.getElementById('email').value="";
                    document.getElementById('password').value="";
                    // Prikazati upozorenje korisniku
                    alert('Pogrešno korisničko ime ili lozinka.');
                }
            } else {
                console.log('Greška u komunikaciji sa serverom. Status:', xhr.status);
                // Prikazati upozorenje korisniku
                alert('Greška u komunikaciji sa serverom.');
            }
        }
    };
}

// Dohvat e-maila iz lokalne pohrane
var storedEmail = window.localStorage.getItem('email');
console.log('Dohvaćeni e-mail:', storedEmail);



// Funkcija koja postavlja tekst elementa na temelju ključa

function postaviTekst(id, kljuc, podaci) {
    $(`#${id}`).text(podaci[kljuc]);
}


// Funkcija koja dohvaća podatke i popunjava tablice
function dohvatiPodatke() {

    // Dohvati podatke o učeniku
    $.ajax({
        url: 'http://localhost:4000/osobni_podaci/:storedEmail',
        method: 'GET',
        data: { korisnicko_ime: storedEmail },
        success: function (data) {
            if (data.length > 0) {
                // Prikaz podataka o učeniku
                postaviTekst('rbr', 'redni_broj', data[0]);
                postaviTekst('name', 'ime_i_prezime', data[0]);
                postaviTekst('oib', 'oib', data[0]);
                postaviTekst('mjesto', 'mjesto_rodenja', data[0]);
                postaviTekst('mbroj', 'maticni_broj', data[0]);
                postaviTekst('datum', 'datum_rodenja', data[0]);
                postaviTekst('adresaU', 'adresa', data[0]);

                // Prikaz podataka o roditeljima
                const roditelji = data[0].podaci_o_roditeljima;
                postaviTekst('majka', 'majka', roditelji);
                postaviTekst('otac', 'otac', roditelji);
                postaviTekst('adresa', 'adresa',roditelji);
                postaviTekst('telefon', 'telefon', roditelji);
            }
        },
        error: function (error) {
            console.error('Greška prilikom dohvaćanja podataka:', error);
        }
    });
}

/// Funkcija za dohvaćanje informacija o razredniku
// Funkcija za dohvaćanje informacija o razredniku
function prikaziInformacijeORazredniku() {
    // Dohvati pohranjeno korisničko ime
    var storedEmail = window.localStorage.getItem('email');

    // Dohvati podatke o razredniku s poslužitelja
    $.ajax({
        url: 'http://localhost:4000/studenti/' + storedEmail,
        method: 'GET',
        success: function (data) {
            if (data && data.length > 0 && data[0].ime_prezime_razrednika) {
                // Prikazuje ime i prezime razrednika
                $('#imePrezimeRazrednika').text(data[0].ime_prezime_razrednika);
            } else {
                console.error('Podaci o razredniku nisu pronađeni ili nemaju polje "ime_prezime_razrednika".');
            }
        },
        error: function (error) {
            console.error('Greška prilikom dohvaćanja podataka o razredniku:', error);
        }
    });
}

// Poziv funkcije prilikom učitavanja stranice
$(document).ready(function () {
    prikaziInformacijeORazredniku();
});



// Funkcija za dohvaćanje i postavljanje korisničkog imena
function prikaziKorisnickoIme() {
    // Dohvati korisničko ime iz lokalne pohrane
    var storedEmail = window.localStorage.getItem('email');

    // Postavi korisničko ime u element s ID-om "aaiAdresa"
    $('#aaiAdresa').text(storedEmail);
}

// Pozovi funkciju prilikom učitavanja stranice
$(document).ready(function () {
    prikaziKorisnickoIme();
});
$(document).ready(function () {
    prikaziKorisnickoIme();
});


//ovdje se piše kod
/*
function ispravno(email) {
    return email.includes('@');
}

function naslovna() {
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
*/
//funkcije za otvaranje stranica pomoću gumba
function ocjene() {
    window.location.href='ocjene.html';
}

function podaci() {
    window.location.href='podaci.html';
}

function odjava() {
    window.location.href = 'prijava.html';
    localStorage.removeItem('email');
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

//Primjer podataka za ispite
const exams = [
    { name: 'Ispit 1', date: new Date('2023-10-10') },
    { name: 'Ispit 2', date: new Date('2023-11-20') },
    { name: 'Ispit 3', date: new Date('2023-12-05') },
    { name: 'Ispit 4', date: new Date('2023-12-15') },
    { name: 'Ispit 5', date: new Date('2024-01-10') },
];
/*
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
*/


