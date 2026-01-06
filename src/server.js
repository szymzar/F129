const app = require("./app.js");
const { connectDB } = require('./data/connection');

const PORT =3001;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});