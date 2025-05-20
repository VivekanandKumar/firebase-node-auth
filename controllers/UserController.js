import createHttpError from "http-errors";
import firebaseAdmin from "../firebase/firebase-admin.js";
import UserModal from "../models/UserModal.js";
import EmailService from "../Utils/EmailServices.js";
const RegisterUser = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) return next(createHttpError(400, "All fields are required."));

        // Check email existance
        const UserExists = await UserModal.exists({ email });
        if (UserExists) return next(createHttpError(400, "Email already in use."));

        // Create User in database
        const newUser = await UserModal.create({
            name,
            email,
        });

        // create User in firebase
        const user = await firebaseAdmin.createUser({
            email,
            password,
            displayName: name,
            uid: newUser._id.toString(),
        });

        // email verification link
        const emailLink = await firebaseAdmin.generateEmailVerificationLink(email, {
            url: process.env.BASE_URL + "/user/verifyemail",
            handleCodeInApp: true,
        });

        // send verification email
        EmailService(email).sendVerificationEmail({ url: emailLink, name });
        return res.status(201).json({
            id: user.uid,
            message: "User Created",
        });
    } catch (error) {
        return next(createHttpError(500, error.message));
    }
};

export { RegisterUser };
