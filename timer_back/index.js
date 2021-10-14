const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { graphql, buildSchema } = require("graphql");
const cors = require("cors");

const db = {
  history: [
    { id: "0", title: "Theory", duration: 1500 },
    { id: "1", title: "Break", duration: 300 },
    { id: "2", title: "Lab1", duration: 1500 },
    { id: "3", title: "Break", duration: 300 },
    { id: "4", title: "Lab2", duration: 1500 },
  ],
};

const schema = buildSchema(`
  type Query {
    tasks: [Task!]!
		task(id: ID!): Task
  }

	type Mutation {
		addTask(title: String!, duration: Int!): Task
	}

	type Task {
		id: ID!
		title: String!
		duration: Int!
	}
`);

var rootValue = {
  tasks: () => db.history,
  task: ({ id }) => db.history.find((item) => item.id === id),
  addTask: ({ title, duration }) => {
    const new_task = { id: String(db.history.length), title, duration };
    db.history.push(new_task);
    return new_task;
  },
};

graphql(
  schema,
  `
    query {
      tasks {
        id
        title
        duration
      }
    }
  `,
  rootValue
)
  .then((response) => console.dir(response, { depth: null }))
  .catch((e) => console.log(e));

let app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true, // gui 제공
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphal"));
