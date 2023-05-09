import { Application, Router, } from "https://deno.land/x/oak@v10.5.1/mod.ts";
const app = new Application();
const router = new Router();

//USER CRUD
//Create
router.post('/user/:userid', (ctx) => {
  ctx.response.body = 'Received a POST HTTP method';
});
//Read
router.get('/user/:userId', (ctx) => {
  ctx.response.body = `Received a GET HTTP method on user/${ctx.params.userId}`;
});
//Delete
router.delete('/user/:userid', (ctx) => {
  ctx.response.body = 'Received a DELETE HTTP method';
});

//LINK CRUD
router.post('/link/:linkId', (ctx) => {
  ctx.response.body = 'Received a POST HTTP method';
});
//Read
router.get('/link/:linkId', (ctx) => {
  ctx.response.body = `Received a GET HTTP method on user/${ctx.params.linkId}`;
});
//Delete
router.delete('/link/:linkId', (ctx) => {
  ctx.response.body = 'Received a DELETE HTTP method';
});


/*Links can be created and accessed, and have the following: linkID, linkTitle, linkDesc, linkScore
Members can be created and accessed, and have the following: memberID, memberUsername, memberPassword,

SQL also stores:
    - Links voted on by members (memberID, linkID, scoreDelta)
    - What Links were made by who (memberID, link ID, creation Datetime)
    - Links hidden by members (memberID, linkID)

Can't RELOAD screen (only change visibility):
    - if Posting a new link
    - rating a link
    - hiding a link
    - changing view from most recent/Highest rated

Can RELOAD screen:
    - Viewing Member Profile
    - Creating a Member Profile

*/

app.use(router.routes());

await app.listen({ port: 3000});
