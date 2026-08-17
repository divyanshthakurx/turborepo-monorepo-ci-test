import express from "express";
import { prisma } from "@repo/db/prisma"

const app = express()

app.post("/", (req, res) => {
  res.send("hello from http server")
})

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password
      }
    });

    res.send("Signup Success");
    res.json({
      message: "Signup Success",
      userId: user.id
    })

  } catch (error) {
    console.error(error);
  }
 
})

app.listen(3000, () => {
  console.log("server is running")
})