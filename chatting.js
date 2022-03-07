const express = require("express");
// const { use } = require("express/lib/application");
const fs = require("fs");
const qs = require("qs");
const readline = require("readline");
const server = express();
server.listen(80, () => {
  console.log("http://127.0.0.1:15672");
});
// 设置账号
const user = {
  // 请求路径：对应的账号名
  user_1001: "test_user01",
  user_1002: "test_user02",
};
// 聊天记录储存文件
const dbFilePath = "./user/demo.txt";

// 对用户首页路径判断
server.use((req, res, next) => {
  let name = req.url;
  name = name.split("/")[1];
  console.log(name);
  if (!user[name]) {
    res.status(404).end();
    return;
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Cache-Control", "max-age=200");
    next();
  }
  // console.log(req.url.match(/^(user)*/g));
});
server.use(express.urlencoded({ extended: false }));

server.use("/:name", express.static("dist"));
// 查询用户信息
server.get("/:name/queryChatting", (req, res, next) => {
  let connect = {
    from: user[req.params.name],
  };
  for (let key in user) {
    if (user[key] !== user[req.params.name]) {
      connect.to = user[key];
      break;
    }
  }
  console.log(connect);
  readFileToArr(connect.from, (data) => {
    // console.log(data);
    connect.sub = data;
    res.status(200).send(connect);
  });
});
// 储存信息
server.post("/:name/increaseChatting", (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    /*console.log("内容为空");*/
    res.status(404).end();
    return;
  }
  // res.setHeader("Access-Control-Allow-Headers", "content-type");
  let getUseMessage = qs.parse(req.body);
  /* redFail((data) => {
    let all = new Array();
    if (!data) {

      appendFile(JSON.stringify(toSaveMessage));
      console.log(1);

      res.status(200).end();
      return;
    }
    all.push(data);
    all.push(toSaveMessage);
    appendFile(all);
    res.status(200).end();
  }); */

  appendFile(`${JSON.stringify(getUseMessage)}\n`);
  res.status(200).end();
});

server.use((req, res, next) => {
  res.status(404).end();
});

function appendFile(parms) {
  fs.appendFile(dbFilePath, parms, (err) => {
    if (err) {
      return console.log(`文件写入失败 ${err.message}`);
    }
  });
}
function redFail(callback) {
  fs.readFile(dbFilePath, "utf-8", (err, data) => {
    if (err) {
      return console.log(`文件读取失败失败 ${err.message}`);
    }
    callback(data);
  });
}
function readFileToArr(who, callback) {
  let fRead = fs.createReadStream(dbFilePath);
  let objReadline = readline.createInterface({
    input: fRead,
  });
  let arr = new Array();
  objReadline.on("line", (line) => {
    let temp = JSON.parse(line);
    if (who !== temp.from) {
      temp.msg.who = "receiver";
    }
    arr.push(temp);
  });
  objReadline.on("close", () => {
    callback(arr);
  });
}
