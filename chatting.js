const express = require("express"),
  // const { use } = require("express/lib/application");
  fs = require("fs"),
  path = require("path"),
  // { userInfo } = require("os"),
  qs = require("qs"),
  readline = require("readline"),
  server = express(),
  // 设置服务器地址
  serverIp = "127.0.0.1",
  serverPort = "15672",

  serverUrl = `http://${serverIp}:${serverPort}/`;

server.listen(serverPort, () => {
  console.log("服务器地址：" + serverUrl);
});

// 设置账号

let user = require(path.resolve("./User.json"));
console.log(user);
// 控制台输出访问地址
Object.keys(user).forEach(ele => {
  user[ele].avtar = `${serverUrl}${ele}/${user[ele].avtar}`;

  console.log(`访问网址：${serverUrl}${ele}/`);
  console.log(user[ele].avtar);
});
// 聊天记录储存文件
const dbFilePath = "./user/demo.txt";

// 对用户首页路径判断
server.use((req, res, next) => {
  let name = req.url;
  name = name.split("/")[1];
  if (!user[name]) {
    res.status(404).end();
    return;
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Cache-Control", "max-age=200");
    next();
  }
});
server.use(express.urlencoded({ extended: false }));

server.use("/:name", express.static("dist"));
// 查询用户信息
server.get("/:name/queryChatting", (req, res, next) => {
  let connect = {
    from: user[req.params.name].name,
    avtar: user[req.params.name].avtar,
  };
  for (let key in user) {
    if (user[key] !== user[req.params.name]) {
      connect.to = "everyone";
      break;
    }
  }
  console.log("用户：" + connect.from);
  readFileToArr(connect.from, (data) => {
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
