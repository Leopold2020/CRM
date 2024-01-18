const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
const port = process.env.REACT_APP_PORT || 5000;
console.log(process.env.REACT_APP_PORT);
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
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/account/create", token.verifyToken, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { username, password, email, role } = req.body;
      const createRes = await account.create(username, password, email, role);
      res.json(createRes);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/account/update", token.verifyToken, async (req, res) => {
  try {
    const { id, username, password, email, role } = req.body;
    const updateRes = await account.updateAccount(id, username, password, email, role);
    res.json(updateRes);
  } catch (error) {
    console.log(error);
  }
});

app.post("/account/delete", token.verifyToken, async (req, res) => {
  try {
    const { id } = req.body;
    if (req.user.role === "admin" || req.user.id === id) {
      const deleteRes = await account.deleteAccount(id);
      res.json(deleteRes);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/account/all", token.verifyToken, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const accountList = await account.getAccountList();
      res.json(accountList);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/company/use/:name", token.verifyToken, async (req, res) => {
  try {
    const company_to_send = await company.getCompany(req.params.name);
    res.json(company_to_send);
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

app.post("/company/delete", token.verifyToken, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const { id } = req.body;
      const deleteRes = await company.deleteCompany(id);
      res.json(deleteRes);
    } else {
      res.sendStatus(403);
    }
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
