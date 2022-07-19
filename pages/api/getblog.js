import * as fs from "fs";

export default async function handler(req, res) {
  let data = await fs.promises.readdir("data");
  let allBlogs = [];
  let myfile;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    myfile = await fs.promises.readFile(`data/${item}`);
    allBlogs.push(JSON.parse(myfile));
  }
  res.status(200).json(allBlogs);
}
