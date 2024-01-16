$(document).ready(function () {
    // Function to set text content of an element
    function postaviTekst(elementId, property, data) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = data[property];
        }
    }

    // Fetch data from MongoDB
    $.ajax({
        url: 'http://localhost:4000/biljeske_na_izbornoj_traci/',
        method: 'GET',
        success: function (data) {
            if (data.length > 0) {
                const biljeska = data[0]; // Assuming there's only one record

                // Display data on the HTML page
                postaviTekst('tekst', 'biljeska_razrednika', biljeska);
                postaviTekst('aktivnost', 'izvanskolske_aktivnosti', biljeska);
            }
        },
        error: function (error) {
            console.error('Greška prilikom dohvaćanja podataka:', error);
        }
    });
});
