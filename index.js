const express = require("express");
const { createCanvas, loadImage } = require("canvas");

const app = express();

app.get("/card", async (req, res) => {

  let balance = req.query.balance || "0.00";
  let username = req.query.username || "User";
  let userid = req.query.userid || "000000";
  let date = new Date().toLocaleDateString();

  const width = 800;
  const height = 500;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // 🔥 load your template image
  const bg = await loadImage("https://share.google/9UlX39AVESv5fJHSe"); // এখানে তোমার image URL দিবা
  ctx.drawImage(bg, 0, 0, width, height);

  // ===== TEXT STYLE =====
  ctx.fillStyle = "#000";
  ctx.font = "bold 32px Arial";

  // BALANCE
  ctx.fillText(`$ ${balance}`, 300, 180);

  // USERNAME
  ctx.font = "26px Arial";
  ctx.fillText(username, 300, 260);

  // USER ID
  ctx.fillText(userid, 300, 320);

  // DATE
  ctx.fillText(date, 300, 380);

  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);

});

app.listen(3000, () => console.log("API running on 3000"));
