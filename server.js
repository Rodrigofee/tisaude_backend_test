const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extendes: true}));
app.use(express.json());

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on: http://localhost:${PORT}`));
}).catch(err => {
    console.log("Error: " + err);
});

