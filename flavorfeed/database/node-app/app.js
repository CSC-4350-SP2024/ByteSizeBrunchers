const postgres = require('postgres');

// postgres:flavorfeed is your usernameforpostgres:passwordforpostgres, be sure to change it if your credentials are different
const sql = postgres('postgres://tama:flavorfeed@localhost/tama');

// Function to fetch data from the database
async function fetchAllData() {
    try {
        const result = await sql`SELECT * FROM users`;
        return result
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchUser(userID) {
    try {
        const result = await sql`SELECT * FROM users WHERE USERID = ${userID}`;
        return result
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}
// Call the function to perform the query

async function fetchConversationID(userID) {
    try {
        const result = await sql`SELECT conversationids FROM users WHERE USERID = ${userID}`;
        return result
    } catch (error) {
        console.error('Error fetching conversation ID:', error);
    }
}
async function fetchConversation(conversationID) {
    try {
        const result = await sql`SELECT * FROM conversations WHERE CONVERSATIONID = ${conversationID}`;
        return result
    } catch (error) {
        console.error('Error fetching conversation:', error);
    }
}

async function appendUserInput(conversationID, userInput) {
  try {
    await sql`UPDATE conversations SET userPrompts = userPrompts || ARRAY[${userInput}] WHERE conversationID = ${conversationID}`;
    console.log('User input appended successfully');
  } catch (error) {
    console.error('Error appending user input:', error);
  }
}

async function appendModelOutput(conversationID, modelOutput) {
  try {
    await sql`UPDATE conversations SET modelResponses = modelResponses || ARRAY[${modelOutput}] WHERE conversationID = ${conversationID}`;
    console.log('Model output appended successfully');
  } catch (error) {
    console.error('Error appending model output:', error);
  }
}

async function test() {
    try {
        //fetchAllData();
        const userID = "e6328e4a-4477-4273-b299-8630ee657439"
        //fetchUser(userID);
        const result = await fetchConversationID(userID)
        const conversationID = result[0].conversationids[0]     
        //console.log(result)
        //console.log(conversationID)
        console.log(await fetchConversation(conversationID))
        await appendUserInput(conversationID, "I want hotdogs")
        console.log(await fetchConversation(conversationID))
        await appendModelOutput(conversationID, "Then get some hotdogs, yo")
        console.log(await fetchConversation(conversationID))

    } catch (error) {
        console.error('Error:', error);
    }
}

test();