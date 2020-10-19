import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import expressPlayGround from 'graphql-playground-middleware-express';
import schema from './schema';


const app = express();

app.use('*', cors());
app.use(compression());


const server = new ApolloServer({
    schema,
    introspection:true
})

server.applyMiddleware({app});

app.get('/', expressPlayGround ({
    endpoint: '/graphql'
}))

const port = 5400

app.listen(
    {port},
    () => console.log(`run server http://localhost:${port}${server.graphqlPath}`))