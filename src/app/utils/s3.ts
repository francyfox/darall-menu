import AWS from 'aws-sdk'
import { CONFIG } from "../env.config";

AWS.config.update({
  accessKeyId: CONFIG.S3_ACCESS_KEY,
  secretAccessKey: CONFIG.S3_SECRET_KEY,
  s3ForcePathStyle: true
})

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(CONFIG.S3_ENDPOINT),
  params: {
    Bucket: CONFIG.S3_BUCKET
  }
})

export default s3
