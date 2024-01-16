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