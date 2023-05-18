import { Application, Router, } from "https://deno.land/x/oak@v10.5.1/mod.ts"; //Because Switch-Cases are annoying
import * as log from "https://deno.land/std@0.186.0/log/mod.ts"; //Because I track the Data interchange.

import * as database from "./Modules/DatabaseConnect.js"
import * as passage from "./Modules/passwordEncryption.js";

//Maybe it's not lazy to have Static locations for easy changes, but I am definitely lazy.
const port = 3000;
const staticDirectory = `${Deno.cwd()}/Ass2_Trials`;

//Constructors
const app = new Application();
const router = new Router();

//USER CRUD
//Create
router.post(`/user/:userid`, async (ctx) => {
  ctx.response.body = ctx.request.body(); 
  //No real flow of Data, but the sent data can be viewed by the client if they wish

  const body = await ctx.request.body().value //shorthand body

  body.password = await passage.encryptPassword(body.password)

  const count = await database.connectUser(body.username).rowCount;
  if (count < 1) {
    //If there are no existing accounts by the same Name
    database.createUser(body.username, body.password);
  }

});

//Read
router.get(`/user/:userId`, (ctx) => {
  console.log(`GET user/${ctx.params.userId}`);
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
  ctx.send = {
    root: staticDirectory,
    index: "index.html",
  }
}
);
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

//Check for Static
app.use(async (context, next) => {
  try {
    console.log(`[STATIC ${context.request.method}] ${context.request.url.pathname}`)
    await context.send({
      root: staticDirectory,
      index: "index.html",
    })
  } catch (_) {
    log.warning(`[STATIC NOT FOUND]`); //Just so I know when it has to compute instead of using the static files;
    await next();
  }
})

log.info( await database.resetDatabase());





app.use(router.routes());
app.addEventListener("listen", ({ port }) => console.log(`Dancing Pals Started. listening on port: ${port}`) )
await app.listen({ port});