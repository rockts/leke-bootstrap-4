var http = require("http");
var crypto = require("crypto");
var exec = require("child_process").exec;

// 在Webhook中设定的secret
var secret = "123456";
// 在Webhook中设定的Payload URL
var url = "/app";

http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end();

    if (
      request.headers["x-github-event"] &&
      request.headers["x-github-event"] === "push"
    ) {
      console.log("push");

      request.on("data", function(chunk) {
        var Signature = request.headers["x-hub-signature"];
        //console.log(chunk.toString()); chunk中存储了payload的数据,如果需要可以拿出来做更精确的处理.比如部署触发该次push的commit的代码
        if (
          verifySecret(Signature, sign(secret, chunk.toString())) &&
          verifyUrl(url, request.url)
        ) {
          console.log("verify");
          runCommand();
        } else {
          console.log("verify faild");
        }
      });
    }
  })
  .listen(7777, "127.0.0.1"); // 对,服务监听的是内网地址.用Nginx反代一下就好.(当然直接丢到外网也没问题)

function sign(secret, data) {
  return (
    "sha1=" +
    crypto
      .createHmac("sha1", secret)
      .update(data)
      .digest("hex")
  );
}

function verifySecret(data0, data1) {
  return data0 == data1;
}

function verifyUrl(data0, data1) {
  return data0 == data1;
}

function runCommand() {
  exec("./deploy.sh", function(err, stdout, stderr) {
    if (err) {
      console.log("error:" + stderr);
    } else {
      console.log("stdout:" + stdout);
    }
  });
}
