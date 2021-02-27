var QRCode = require("qrcode");
import * as Bucket from "@spica-devkit/bucket";


export default async function(req,res) {
    const {qrID} = req.query;
    const qrCodeBucket = process.env.BUCKET_ID;
    Bucket.initialize({apikey: process.env.APIKEY});

    const qrData = await Bucket.data.get(qrCodeBucket, qrID);
    let code = await QRCode.toDataURL(qrData.data, {width: 300});
    console.log(code);
    return res.status(200).send("<html><body><img src='" + code + "' /></body></html>");
}