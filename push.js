var webPush = require("web-push");

const vapidKeys = {
    "publicKey": "BEIFxdrbBqQBPzfNulKP6GojjVLHotKs8wweEfg1BGVDFAO16BBRnb2zWv-twykppEk6u0sYLDLamOWD5E7KF20",
    "privateKey": "lsrt21jVVH75pg90JIedfNp4aYtrRBLKFzl1zE6-8Yw"
};

webPush.setVapidDetails(
    "mailto:aie.rcsw@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dTXfcX_cagU:APA91bEcchpKClEX_JoXhtrSwWtjzlALdjQWU0ld2Y9uGNzjgDuHOib03sMHDTBJPjtjbHhOZDIKp5dvXGk9-tkK-UY_UKIlmqOv-X_RZhGyLf4jd74E0_E_DN-Cf7-cJ_4o9SoG_V-O",
    "keys": {
        "p256dh": "BBzV3Q8/rCIZ/8lmNR1axXRRkm1IBcO5M9PBD+M8gxKNTh/Jek/cFSzC8jNr6l+g9yRTBSqfxN1wCkYKjOUCoWE=",
        "auth": "fMej08SjaVMcY5qVVWcvzw=="
    }
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
    gcmAPIKey: "244108023299",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);

