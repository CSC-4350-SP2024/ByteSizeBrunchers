const postgres = require('postgres');

// postgres:flavorfeed is your usernameforpostgres:passwordforpostgres, be sure to change it if your credentials are different
const sql = postgres('postgres://tama:flavorfeed@localhost/tama');
const http = require('http');

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

function promptLLM(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/query',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error('Failed to parse JSON response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(JSON.stringify({ query: query }));
    req.end();
  });
}

async function userQuery(userID, query) {
    try {
        const result = await fetchConversationID(userID);
        const conversationID = result[0].conversationids[0];
        const conversation = await fetchConversation(conversationID);
        //const conversationContent = Array.prototype.zip.call(conversation[0].userprompts, conversation[0].modelresponses);
        //console.log(conversationContent);
        const userprompts = conversation[0].userprompts;
        const modelresponses = conversation[0].modelresponses;
        let conversationString = '';
        for (let i = 0; i < userprompts.length; i++) {
            conversationString += 'user: ' + userprompts[i] + '\n'
            conversationString += 'model: ' + modelresponses[i] + '\n'
        }
        conversationString += 'user: ' + query;
        const llmResponse = await promptLLM(conversationString);
        return llmResponse;
    } catch (error) {
        console.error('Error:', error);
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
        // userprompts & modelresponses
        //console.log(await fetchConversation(conversationID))

        //await appendUserInput(conversationID, "I want hotdogs")
        //console.log(await fetchConversation(conversationID))
        //await appendModelOutput(conversationID, "Then get some hotdogs, yo")
        //console.log(await fetchConversation(conversationID))
        //await promptLLM("I want something hearty");
        //console.log(await promptLLM("I want something hearty"))
        console.log(await userQuery(userID, "I want something hearty"))

    } catch (error) {
        console.error('Error:', error);
    }
}

//test();

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/query') {
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk;
    });

    req.on('end', async () => {
      try {
        const { userID, query } = JSON.parse(requestBody);
        const response = await userQuery(userID, query);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});