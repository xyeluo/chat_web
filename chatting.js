const express = require("express"),
  fs = require("fs"),
  path = require("path"),
  qs = require("qs"),
  readline = require("readline"),
  serverIp = "127.0.0.1", // 设置显示的后台服务器地址
  serverPort = "15672",  // 端口
  dbFilePath = "./user/demo.txt", // 聊天记录储存路径
  serverUrl = `${serverIp}:${serverPort}/`,
  server = express();

// 设置账号
let user = require(path.resolve("./user/User.json")),
  onlineUser = [];// 在线用户

Object.keys(user).forEach(ele => {
  user[ele].avtar = `/${ele}/${user[ele].avtar}`;
  // 控制台输出访问地址
  console.log(`访问网址：${serverUrl}${ele}/`);
});

// 对用户首页路径判断
server.use((req, res, next) => {
  let reqParam = req.url;
  reqParam = reqParam.split("/")[1];
  if (user[reqParam] || reqParam == "online") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Cache-Control", "max-age=200");
    next();
    return;
  }
  res.status(404).end("Not found");
});
// 在线人数
server.get("/online", (req, res, next) => {
  setTimeout(() => {
    onlineUser = [...new Set(onlineUser)];
    let num = onlineUser.length;
    if (num) {
      res.status(200).send(num.toString());
      return;
    }
    res.status(200).send("1");
  }, 500);
})
// 每隔五十秒清空在线人数，重新计数
setInterval(() => {
  onlineUser = [];
}, 50000);

server.use(express.urlencoded({ extended: false }));

server.use("/:name", express.static("dist"));
// 查询用户信息
server.get("/:name/queryChatting", (req, res, next) => {
  let connect = {
    from: user[req.params.name].name,
    avtar: user[req.params.name].avtar,
  };
  onlineUser.push(connect.from);
  for (let key in user) {
    if (user[key] !== user[req.params.name]) {
      connect.to = "everyone";
      break;
    }
  }
  // console.log("当前请求用户：" + connect.from);
  readFileToArr(connect.from, (data) => {
    connect.sub = data;
    res.status(200).send(connect);
  });
})

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

server.listen(serverPort);