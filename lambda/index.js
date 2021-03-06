// dependencies
const AWS = require('aws-sdk');
const util = require('util');
const fs = require('fs');
// get reference to S3 client
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
    // c123ld-12;
    // 2s-z;
    // try{
    //     throw new Error("asdasd");
    // }
    // catch(e) {
    //     console.log(e);
    // }
    console.log('stringify 的 event', JSON.stringify(event));
    // Read options from the event parameter.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    const srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    const srcKey    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    const dstBucket = "ming-copy";
    const dstKey    = srcKey;
    console.log('dstBucket', dstBucket);
    console.log('dstKey', dstKey);
    try {
        const params = {
            Bucket: srcBucket,
            Key: srcKey
        };
        console.log('params:', params);
        var originFile = await s3.getObject(params).promise();
        console.log('originFile', JSON.stringify(originFile));

    } catch (error) {
        console.log("get 的error", error);
        return;
    }

    try {
        const destparams = {
            Bucket: dstBucket,
            Key: dstKey,
            Body: originFile.Body,
            ContentType: "image"
        };

        const putResult = await s3.putObject(destparams).promise();

    } catch (error) {
        console.log('put的error', error);
        return;
    }

    console.log('Successfully resized ' + srcBucket + '/' + srcKey +
        ' and uploaded to ' + dstBucket + '/' + dstKey);
};
