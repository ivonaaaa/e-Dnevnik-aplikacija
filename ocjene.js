//za prikaz podataka o ocjenama na stranici predmet.html

document.addEventListener('DOMContentLoaded', function() {
    
    // Dohvati podatke o predmetima
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:4000/predmeti/:storedEmail', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            if (data.length > 0) {
                // Iteriraj kroz podatke o predmetima
                for (var i = 0; i < data.length; i++) {
                    var predmet = data[i];
                    var nazivPredmeta = predmet.naziv;

                    // Postavi tekst unutar elementa nakon što su svi elementi učitani
                    document.getElementById('zakljucna').textContent = predmet.zakljuceno;
                    document.getElementById('nazivPredmeta').textContent = nazivPredmeta;

                    // Provjeri postojanje ocjena
                    if (predmet.ocjene_po_mjesecima) {
                        if (predmet.ocjene_proizlaze_iz == "TEORIJA") {
                            document.getElementById('teorija' + predmet.ocjene_po_mjesecima.mjesec).textContent = predmet.ocjene_po_mjesecima.ocjena;
                        }

                        if (predmet.ocjene_proizlaze_iz == "ZADATCI") {
                            document.getElementById('zadatci' + predmet.ocjene_po_mjesecima.mjesec).textContent = predmet.ocjene_po_mjesecima.ocjena;
                        }
                        if (predmet.ocjene_proizlaze_iz == "RAZUMIJEVANJE") {
                            document.getElementById('razumijevanje' + predmet.ocjene_po_mjesecima.mjesec).textContent = predmet.ocjene_po_mjesecima.ocjena;
                        }
                        if (predmet.ocjene_proizlaze_iz == "AKTIVNOST") {
                            document.getElementById('aktivnost' + predmet.ocjene_po_mjesecima.mjesec).textContent = predmet.ocjene_po_mjesecima.ocjena;
                        }
                        if (predmet.ocjene_proizlaze_iz == "DOMAĆI RAD") {
                            document.getElementById('domaci' + predmet.ocjene_po_mjesecima.mjesec).textContent = predmet.ocjene_po_mjesecima.ocjena;
                        }
                    }
                }
            }
        }
    };

    xhr.send();
});

//dodavanje biljeski na stranicu predmet
document.addEventListener('DOMContentLoaded', function() {
    // Dohvati podatke iz baze
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:4000/biljeske/:storedEmail', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var podaci = JSON.parse(xhr.responseText);
            if (podaci.length > 0) {
                // Iteriraj kroz podatke i popuni tablicu
                for (var i = 0; i < podaci.length; i++) {
                    var redak = document.createElement('tr');
                    var datumCelija = document.createElement('td');
                    var biljeskaCelija = document.createElement('td');
                    var ocjenaCelija = document.createElement('td');

                    // Postavi sadržaj ćelija
                    datumCelija.textContent = podaci[i].datum;
                    biljeskaCelija.textContent = podaci[i].biljeska;
                    ocjenaCelija.textContent = podaci[i].ocjena;

                    // Dodaj ćelije u redak
                    redak.appendChild(datumCelija);
                    redak.appendChild(biljeskaCelija);
                    redak.appendChild(ocjenaCelija);

                    // Dodaj redak u tablicu
                    document.getElementById('tablica').appendChild(redak);
                }
            }
            else{
                console.log('nema podataka');
            }
        }
    };

    xhr.send();
})