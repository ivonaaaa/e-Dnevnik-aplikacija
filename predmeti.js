//dohvaćanje predmeta na stranici Ocjene
document.addEventListener('DOMContentLoaded', function() {
    console.log('1. Početak izvršavanja koda nakon učitavanja HTML-a.');
    let subjectsSection = document.querySelector('.subjects');
    console.log('2. Pronađen element s klasom "subjects":', subjectsSection);

    // Provjeri postojanje elementa s klasom "subjects"
    if (subjectsSection) {
        // Dohvati podatke o predmetima
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:4000/predmeti/:storedEmail', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                if (data.length > 0) {
                    // Prikazi nazive predmeta
                    for (var i = 0; i < data.length; i++) {
                        let nazivPredmeta = data[i].naziv;
                        let button = document.createElement('button');
                        button.textContent = nazivPredmeta;
                        button.className = 'subject-button';
                        button.onclick = function() {
                            // Spremi odabrani predmet u local storage
                            localStorage.setItem('selectedSubject', nazivPredmeta);
                            // Prenesi naziv predmeta i otvori "predmet.html"
                            window.location.href = 'predmet.html';
                        };

                        // Dodaj gumb u sekciju
                        subjectsSection.appendChild(button);
                    }
                }
            }
        };

        xhr.send();
    } else {
        console.error('Element s klasom "subjects" nije pronađen.');
    }
});

