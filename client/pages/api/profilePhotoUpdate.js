import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  region: 'eu-central-1',
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
  signatureVersion: 'v4',
});

export default async (req, res) => {
  var { type, name } = JSON.parse(req.body);
  console.log('to jest req.body', req.body);

  const fileParams = await {
    Bucket: 'meetbe-images',
    Key: `profilePhotos/${name}`,
    Expires: 30,
    ContentType: type,
    ACL: 'public-read',
  };

  const url = await s3.getSignedUrlPromise('putObject', fileParams);
  res.status(200).send({ url });
};
