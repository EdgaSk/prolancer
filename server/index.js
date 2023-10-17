const express = require("express");
const cors = require("cors");
const path = require("path");
const { logger } = require("./middleware/logEvents");
const { errorHandle } = require("./middleware/errorHandle");
const { corsOptions } = require("./config/corsOptions");
const { verifyJWT } = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 8000;
const URI = process.env.DB_PATH;

const app = express();

//build for json
app.use(express.json());

//logger
app.use(logger);

//Cross Origins Resource Sharing
app.use(cors(corsOptions));

//middleware for cookie
app.use(cookieParser());

//routes
app.get("/", (req, res) => res.send("Server API is running!"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/users", require("./routes/users"));
app.use("/jobs", require("./routes/jobs"));

//error handle
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
