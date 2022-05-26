const express = require("express");
const article = require("../schemas/article");
const Articles = require("../schemas/article");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this is root page");
});

// 게시글 조회 페이지
router.get("/article", async (req, res) => {
  try {
    const { borderDate } = req.query;
    const article = await Articles.find({ borderDate });
    res.json({ article });
  } catch (err) {
    console.error(err);
    return res.status(404)
  }
});

// 상세 조회
router.get("/article/:authorId", async (req, res) => {
  const { authorId } = req.params;

  const [ detail ] = await Articles.find({}, { authorId:1, title:1, name:1});
  res.json({
    detail,
  });
});


// 게시글 생성
router.post("/article", async (req, res) => {
  const { authorId, title, name, password, borderDate } = req.body;
  try {
    const article = await Articles.find({ authorId });
    if (!article.length) {
      await Articles.create({ authorId, title, name, password, borderDate })
    }
    res.send ( article );
  } catch (err) {
    console.log(err)
    return res.status(404)
  }
});


// 삭제 페이지
router.delete("/article/:password", async (req, res) => {
  const { password } = req.params;
  const isBorder = await Articles.find({ password });
  if (isBorder.length > 0) {
    await Articles.deleteOne({ password });
  }
  res.send({ result: "success" });
});

// 수정 페이지
router.patch("/article/:password", async (req, res) => {
  const { password } = req.params;
  const { authorId, name, title } = req.body;
  isBorder = await Articles.find({ password });
  if (isBorder.length) {
    await Articles.updateOne({ password }, { $set: { authorId, name, title} });
  }
  res.send({ result: "success" });
})

module.exports = router;