CREATE TABLE users (
USERID UUID PRIMARY KEY,
name VARCHAR(100),
diet VARCHAR(50),
conversationIDs UUID[]
);

CREATE TABLE conversations (
CONVERSATIONID UUID PRIMARY KEY,
userPrompts TEXT[],
modelResponses TEXT[]
);
