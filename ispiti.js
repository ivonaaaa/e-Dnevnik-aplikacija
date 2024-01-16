$(document).ready(function () {
    // Function to update the HTML table with biljeske data
    function updateTableWithData(ispitiData) {
        //console.log('Updating table with data:', ispitiData);

        const table = $('#ispitiTablica tbody');
        // Clear existing rows in the table
        table.empty();

        // Loop through the fetched data and add rows to the table
        ispitiData.forEach(item => {
            const formattedDate = new Date(item.datum).toLocaleDateString('en-GB');

            const row = `
                <tr>
                    <td>${item.mjesec}</td>
                    <td>${formattedDate}</td>
                    <td>${item.predmet}</td>
                    <td>${item.biljeska}</td>
                </tr>
            `;

            table.append(row);
        });
    }

    // Fetch data from MongoDB for biljeske
    $.ajax({
        url: 'http://localhost:4000/ispiti/',
        method: 'GET',
        success: function (ispitiData) {
            // Call a function to update the HTML table with the fetched data
            updateTableWithData(ispitiData);
        },
        error: function (error) {
            console.error('Failed to fetch ispiti data. Status:', error.status);
        }
    });

    // Attach event listener to the select dropdown
    $('#mjeseci').change(function () {
        // When the selected month changes, update the data
        updateData();
    });

    // Function to update the HTML table with data based on the selected month
    function updateData() {
        // Get the selected month value
        const selectedMonth = $('#mjeseci').val();

        // Fetch data from MongoDB for the selected month
        $.ajax({
            url: `http://localhost:4000/ispiti/${selectedMonth}`,
            method: 'GET',
            success: function (data) {
                // Call a function to update the HTML table with the fetched data
                updateTableWithData(data);
            },
            error: function (error) {
                console.error('Failed to fetch data. Status:', error.status);
            }
        });
    }

    // Initial data load
    //console.log('Calling updateData for initial load.');
    updateData();
});
