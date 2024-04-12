const postgres = require('postgres');

// postgres:flavorfeed is your usernameforpostgres:passwordforpostgres, be sure to change it if your credentials are different
const sql = postgres('postgres://postgres:flavorfeed@localhost/flavorfeeddata');

// Function to fetch data from the database
async function fetchData() {
    try {
        const result = await sql`SELECT * FROM users`;
        console.log('Data fetched successfully:', result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to perform the query
fetchData();
