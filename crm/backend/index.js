const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const account = require("./components/account");
const company = require("./components/company");
const token = require("./components/token");

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginRes = await account.login(email, password);
    const accessToken = await token.getToken(loginRes);
    res.json({
        name: loginRes.username,
        role: loginRes.role,
        accessToken: accessToken
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/account/create", token.verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      res.sendStatus(403);
    } else {
        const { username, password, email } = req.body;
        const createRes = await account.create(username, password, email);
        res.json(createRes);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/company/use/:name", token.verifyToken, async (req, res) => {
    try {
        const company = await company.getCompany(req.params.name);
        res.json(company);
    } catch (error) {
        console.log(error);
    }
});

app.post("/company/create", token.verifyToken, async (req, res) => {
    try {
        const { name, email, phone, information, status, toCall } = req.body;
        const createRes = await company.createCompany(name, email, phone, information, status, toCall);
        res.json(createRes);
    } catch (error) {
        console.log(error);
    }
});

app.post("/company/update", token.verifyToken, async (req, res) => {
    try {
        const { id, name, email, phone, information, status, toCall } = req.body;
        const updateRes = await company.updateCompany(id, name, email, phone, information, status, toCall);
        res.json(updateRes);
    } catch (error) {
        console.log(error);
    }
});

app.get("/company/all", token.verifyToken, async (req, res) => {
  try {
    const companyList = await company.getCompanyList();
    res.json(companyList);
  } catch (error) {
    console.log(error);
  }
});

app.post("/company/filter", token.verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    const filteredList = await company.filterCompany(name);
    res.json(filteredList);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
