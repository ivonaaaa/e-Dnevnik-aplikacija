// Function to update the HTML table with izostanci data
function updateTableWithData(izostanciData) {
    const table = document.getElementById('izostanciTable');

    // Loop through the fetched data and add rows to the table
    izostanciData.forEach(izostanak => {
        const row = table.insertRow(-1);

        // Add cells to the row
        const datumCell = row.insertCell(0);
        const satCell = row.insertCell(1);
        const predmetCell = row.insertCell(2);
        const statusCell = row.insertCell(3);
        const razlogCell = row.insertCell(4);

        // Format the date
        const formattedDate = new Date(izostanak.datum).toLocaleDateString('en-GB');

        // Populate cell content with data from the izostanak object
        datumCell.textContent = formattedDate;
        satCell.textContent = izostanak.sat + ". sat";
        predmetCell.textContent = izostanak.predmet;
        statusCell.textContent = izostanak.status;

        // Call a separate function for switch statement logic
        updateStatusCell(statusCell, izostanak.status);

        razlogCell.textContent = izostanak.razlog;
    });
}

// Function to update the status cell based on the izostanak status
function updateStatusCell(statusCell, status) {
    switch (status) {
        case 'opravdano':
            statusCell.innerHTML = '✅'; 
            break;
        case 'čeka odluku':
            statusCell.innerHTML = '🕒'; 
            break;
        case 'neopravdano':
            statusCell.innerHTML = '❌'; 
            break;
        default:
            statusCell.textContent = status; // Fallback to the original status if not recognized
    }
}

// Fetch data from MongoDB for izostanci
$.ajax({
    url: 'http://localhost:4000/izostanci/',
    method: 'GET',
    success: function (izostanciData) {
        // Call a function to update the HTML table with the fetched data
        updateTableWithData(izostanciData);
    },
    error: function (error) {
        console.error('Failed to fetch izostanci data. Status:', error.status);
    }
});
