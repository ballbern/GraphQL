// mongodb+srv://kennethmulhern:<password>@nodetest.ioardm6.mongodb.net/?retryWrites=true&w=majority

/* eslint-disable no-undef */
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./scheme/scheme");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.connect(
  "mongodb+srv://kennethmulhern:cFDvouqY0FLLcTKu@nodetest.ioardm6.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("connected to data base");
});

// middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4001, () => {
  console.log("listening to server on 4001");
});
