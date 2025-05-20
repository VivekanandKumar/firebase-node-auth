import admin from "firebase-admin";
import fs from "node:fs";
admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: fs.readFileSync("./firebase/private-key.pem", { encoding: "utf-8" }),
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});
export default admin.auth();
