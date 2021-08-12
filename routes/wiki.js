const express = require("express");
const router = express.Router();
const { Page, User } = require("../models");
const addPage = require("../views/addPage");
const wikiPage = require("../views/wikipage");
const mainPage = require("../views/main");

router.get("/", async (req, res, next) => {
  try {
    res.send(mainPage(await Page.findAll()));
  } catch (error) {
    next(error);
  }
});
router.get("/add", (req, res) => {
  res.send(addPage());
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
    });

    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });

    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  console.log(`hit dynamic route at ${req.params.slug}`);
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } });
    if (page === null) {
      res.status(404);
      console.log("not found");
      throw Error("sorry!");
    }
    res.send(wikiPage(page)); // sequelize sends us an obj of the page, we are telling express to send it as a JSON to the client
  } catch (error) {
    next(error); // sends the error to the next handler, much like a continue; statemnt in a loop
  }
});

module.exports = router;
