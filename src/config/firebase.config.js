const admin = require("firebase-admin");


const firebaseConfig = {
    apiKey: "AIzaSyBUn1XpZu-PrNYFH9m8PP1VUdFXKYSbB8I",
    authDomain: "restaurant-ae24e.firebaseapp.com",
    projectId: "restaurant-ae24e",
    storageBucket: "restaurant-ae24e.appspot.com",
    messagingSenderId: "931274578469",
    appId: "1:931274578469:web:dd6951ba9e63f6a994fdcc",
    measurementId: "G-BP8D2FVDK4"
};
const certification = {
    "type": "service_account",
    "project_id": "restaurant-ae24e",
    "private_key_id": "266f35ea9679f71dc230f5322dc41501d1ffdd41",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDYMhRjI+SC8VK6\nBWxS+Ph5ZApeMEJhCVJmKc5ncRnXsHm+tI32EMy273mlmttsOLiRlCtzlTW3+Y07\ndyQ/X8VXSoIapV1GVIZv8khlhc8W9otFGTDlqJUxb0cgwcZo6ON5/je4EDM9iUwt\ngLP/jLELVW7UeqRs8aTWn845T4pUnhvh2vr36R9bO0ZHzuRwUiWjkxs54rw7tq6R\not3h0llpEDFUBnbg4Zibl0mo6a4DPRtBV4xmAdM5fy8xwIQ1uA3RZ7OxVrf0HwIZ\n8hlDF3qoXEp0LstY4nG4mxIheUghsuh0jBxPOSnfOP3PWtV0y9XmFObSq6zlIfLL\nZhUygAtRAgMBAAECggEABoVDJ2bTm23tH3JurRV4hAvEAsl8lQnnj/CCmszW2VIn\np9xw/CsPS5SvM/MW212eFnj0Mwsc6Mi4bWLXZ2hrbqmvAR/771U5DUsOyy4VHAWR\nV4MOHh0eq9Ql/mtNwUgF5V3pHw5xBzH7B9POCf77r4JzAmpVB3qlzLna6dBX9RuV\n/X9CoCesqBTah3+g3qKKpzimM2Dmp4u+y32rixDVS3TfYVwcaSQGX0Vm97OcZjMX\nh2JU7zGD2ZT18l5C+BFaBIhKLgqU8iFz07WVbQnmDoeLft2n4BEX7oZGMIhZFa4g\nurMl15bB690zYhf6mTIFrEeM5KrXy4AMtfsYynfMQQKBgQDr8DUz6euuxNeclPMr\nSM3q0Lx3lgG75rbwgxr5/y9gN1Vzus5mAm79TEcxTGeMohpPYAUz1SQX9Le1IlEK\nYf+jGAmX++w3GW0jsHHMBfL4mzegaY4K5gZ2/lrnwUOraq8dIgGTGY2wnGFm8TxP\nGzxLqlVCHkGRWezkWx7kbEFaYQKBgQDqlB9Xt1rkY1wOSQJNk0iNKQXjsoAzpHwc\nw/Of/VUa7Wvz4hqddLEgs/VCS04iPu3kkmKK4PHM70rVFP5mLeKYS6l9dv0pvreC\nFI1Acx+8bDm5IA8dYNhBjmZYJswwY6UuFS8LmWoyjAzWBBnOGBNvMNMIKMSkfhDI\nCz/7x1m28QKBgQCiLSLk5E3UfAmY3+mmPw0L8x8ZNEtM1XG6MORCI151TJO4URe+\nlr2j7uKgyFwFFwfut5nb3w5ISTZdk5ERCfumJ8ewaMIdvaR/e7E9BHnW2RqLcQLq\nCuM2t+/Ujcvt8A8ef1mFu3LhixyInhlOZvIzMIoaQKHhP2bOMLQzXxYtAQKBgQCh\nI00AeWCDgMlsurRNS75L0YFNL4Ind3cWX3jMTz6V97/vUUNNJCrEtznj50zt82KB\nYBk3I1yWlU5HX1t+H0kHqvnryMARXAQ85Bc/zZVgXsusIpyfZrZHGiWtqkEbgGeo\nZz7g7erofBIZNcnwK9O1zsk4UqD6CetHL4stTnyPUQKBgQDjWovTtxJ6OPJhdTc9\n89yfMQsargpNMgHsfsZPwGrVNNcB86mpDbLlPUuJfyJV8fR+ON9UfacQkVQf3mQU\ntLjGPMhuoXbRYV0zakGrR2yq0lvd3ArBcnqPbKmVf7LkZVcv0B6PkK2ug5vIoNOK\nw6V0GbQcTVoMuRL+p9FHk9rgkQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-mkg9z@restaurant-ae24e.iam.gserviceaccount.com",
    "client_id": "104644902091692316789",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mkg9z%40restaurant-ae24e.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}
const initFirebase = () => {
    admin.initializeApp({
        credential: admin.credential.cert(certification),
        storageBucket: "restaurant-ae24e.appspot.com"
    });
}

// admin.initializeApp({
//     credential: admin.credential.cert(certification),
//     storageBucket: "restaurant-ae24e.appspot.com"
// });
module.exports = { firebaseConfig, initFirebase, admin };
