//za prikaz podataka o ocjenama na stranici predmet.html
document.addEventListener('DOMContentLoaded', function () {
    // Dohvati odabrani predmet iz local storage
    var selectedSubject = localStorage.getItem('selectedSubject');

    // Provjeri je li predmet odabran
    if (selectedSubject) {
        // Dohvati podatke o predmetima
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:4000/predmeti/:storedEmail', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                if (data.length > 0) {
                    // Pronađi odabrani predmet
                    var selectedPredmet = data.find(predmet => predmet.naziv === selectedSubject);

                    if (selectedPredmet) {
                        // Postavi tekst unutar elementa nakon što su svi elementi učitani
                        document.getElementById('zakljucna').textContent = selectedPredmet.zakljuceno;
                        document.getElementById('nazivPredmeta').textContent = selectedSubject;

                        // Provjeri postojanje ocjena
                        if (selectedPredmet.ocjene_po_mjesecima) {
                            if (selectedPredmet.ocjene_proizlaze_iz == "TEORIJA") {
                                document.getElementById('teorija' + selectedPredmet.ocjene_po_mjesecima.mjesec).textContent = selectedPredmet.ocjene_po_mjesecima.ocjena;
                            }

                            if (selectedPredmet.ocjene_proizlaze_iz == "ZADACI") {
                                document.getElementById('zadaci' + selectedPredmet.ocjene_po_mjesecima.mjesec).textContent = selectedPredmet.ocjene_po_mjesecima.ocjena;
                            }
                            if (selectedPredmet.ocjene_proizlaze_iz == "RAZUMIJEVANJE") {
                                document.getElementById('razumijevanje' + selectedPredmet.ocjene_po_mjesecima.mjesec).textContent = selectedPredmet.ocjene_po_mjesecima.ocjena;
                            }
                            if (selectedPredmet.ocjene_proizlaze_iz == "AKTIVNOST") {
                                document.getElementById('aktivnost' + selectedPredmet.ocjene_po_mjesecima.mjesec).textContent = selectedPredmet.ocjene_po_mjesecima.ocjena;
                            }
                            if (selectedPredmet.ocjene_proizlaze_iz == "DOMAĆI RAD") {
                                document.getElementById('domaci' + selectedPredmet.ocjene_po_mjesecima.mjesec).textContent = selectedPredmet.ocjene_po_mjesecima.ocjena;
                            }

                            // Dohvati podatke iz baze za odabrani predmet
                            var xhrBiljeske = new XMLHttpRequest();
                            xhrBiljeske.open('GET', 'http://localhost:4000/biljeske/:storedEmail?predmet=' + selectedSubject, true);
                            xhrBiljeske.onreadystatechange = function () {
                                if (xhrBiljeske.readyState == 4 && xhrBiljeske.status == 200) {
                                    var podaci = JSON.parse(xhrBiljeske.responseText);
                                    if (podaci.length > 0) {
                                        // Iteriraj kroz podatke i popuni tablicu
                                        for (var i = 0; i < podaci.length; i++) {
                                            console.log('Subject:', data[i].naziv);
                                            if (podaci[i].predmet === selectedSubject) {
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
                                    } else {
                                        console.log('nema podataka');
                                    }
                                }
                            };

                            xhrBiljeske.send();
                        }
                    } else {
                        console.error('Odabrani predmet nije pronađen.');
                    }
                }
            }
        };

        xhr.send();
    } else {
        console.error('Odabrani predmet nije pronađen u local storage.');
    }
});



