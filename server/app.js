const Koa = require('koa');
const KoaRouter = require('koa-router'); // koa-router@next
const koaBody = require('koa-bodyparser'); // koa-bodyparser@next
const { graphqlKoa } = require('apollo-server-koa');
const koaStatic = require('koa-static');
const path = require('path');

const schema = require('./schema.js');

const app = new Koa();
const router = new KoaRouter();

router.post('/graphql', koaBody(), graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));

app.use(koaStatic(path.join(__dirname, '../client/dist')));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(1738);
