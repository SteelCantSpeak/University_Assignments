import { Client } from "https://deno.land/x/postgres@v0.11.2/mod.ts";

const client = new Client({
user:"postgres",
database:"ITECH3108_30349495_a2",
hostname:"localhost",
password:"314159",
port:5432,
});
await client.connect();

async function resetDatabase(){
    const resetForm = 
    `DROP TABLE IF EXISTS "scores" CASCADE;
    DROP TABLE IF EXISTS "links" CASCADE;
    DROP TABLE IF EXISTS "users" ;

    CREATE TABLE users (
    userID varchar(30),
    userpassword varchar(255),
    PRIMARY KEY (userID)
    );
    
    CREATE TABLE links (
    linkID int,
    userID varchar(30),
    title varchar(255),
    body varchar(255),
    totalScore int,
    PRIMARY KEY (linkID),
    FOREIGN KEY (userID) REFERENCES users(userID)
    );
    
    CREATE TABLE scores (
    linkID int,
    userID varchar(30),
    score int,
    PRIMARY KEY (linkID, userID),
    FOREIGN KEY (linkID) REFERENCES links(linkID),
    FOREIGN KEY (userID) REFERENCES users(userID)
    );`

    try {
        await client.queryObject(resetForm);
    } catch (error) {
        return error;
    }

    return "Successfully Reset Database";
}

async function runQuery(query, array){
    const results = await client.queryObject(query, array) ;
    return results;
}

async function connectUser(_username){
    const userData = await client.queryObject `SELECT * FROM users WHERE userid= ${_username};`;
    return userData;
}

async function createUser(_username, _password){
    const {_userData} = await client.queryObject `INSERT INTO users VALUES (${_username}, ${_password});`
}

export { resetDatabase, runQuery, connectUser, createUser };