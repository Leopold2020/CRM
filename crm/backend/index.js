const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const account = require("./components/account");
const company = require("./components/company");

app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const loginRes = await account.login(name, password);
    res.json(loginRes);
  } catch (error) {
    console.log(error);
  }
});

app.post("/create", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const createRes = await account.create(username, password, email);
    res.json(createRes);
  } catch (error) {
    console.log(error);
  }
});

app.get("/company/all", async (req, res) => {
  try {
    const companyList = await company.getCompanyList();
    res.json(companyList);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
