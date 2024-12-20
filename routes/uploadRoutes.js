const AWS = require("aws-sdk");
const keys = require("../config/keys");
const uuid = require("uuid/v1");
const requireLogin = require("../middlewares/requireLogin");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: "us-east-1",
});

module.exports = (app) => {
  app.get("/api/upload", requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.png`;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "images-blog-node",
        ContentType: "image/png",
        Key: key,
      },
      (err, url) => {
        res.send({ key, url });
      }
    );
  });
};
