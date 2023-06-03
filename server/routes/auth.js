
const user = require("../models/user")
const router = require("express").Router();
const admin = require("../config/firebaseConfig");
const { database } = require("../config/firebaseConfig");

router.get("/login", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).send({ message: "Invalid Token" });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodeValue = await admin.auth().verifyIdToken(token)
        if (!decodeValue) {
            return res.status(500).json({ message: "Un Authorized" })
        } else {
            //Checking user exists or not 
            const userExists = await user.findOne({ "user_id": decodeValue.user_id })
            if (!userExists) {
                newUserData(decodeValue, req, res)
            } else {
                updateNewUserData(decodeValue, req, res)
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
});

const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
        name: decodeValue.name,
        email: decodeValue.email,
        imageURL: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time
    })

    try {
        const savedUser = await newUser.save()
        res.status(200).send({ user: savedUser })
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

const updateNewUserData = async (decodeValue, req, res) => {
    const filter = { user_id: decodeValue.user_id };
    const update = { auth_time: 'Updated' };
    const options = { new: true };
    try {
        const result = await user.findOneAndUpdate(filter, update, options);
        res.status(200).send({ user: result })
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message })
    }
}

router.get("/getUsers", async (req, res) => {
    const options = {

    }
    const cursor = await user.find(options);
    if (cursor) {
        res.status(200).send({ success: true, data: cursor })
    } else {
        res.status(400).send({ success: false, msg: "no data found" })

    }
})

router.get("/getUser/:userId", async (req, res) => {
    const filter = { _id: req.params.userId };

    const userExists = await user.findOne({ _id: filter });
    if (!userExists)
        return res.status(400).send({ success: false, msg: "Invalid User ID" });
    if (userExists.favourites) {
        res.status(200).send({ success: true, data: userExists });
    } else {
        res.status(200).send({ success: false, data: null });
    }
});

router.put("/updateRole/:userId", async (req, res) => {
    console.log(req.body.data.role, req.params.userId);
    const filter = { _id: req.params.userId };
    const role = req.body.data.role;
    try {
        const result = await user.findOneAndUpdate(filter, { role: role });
        res.status(200).send({ user: result });
    } catch (err) {
        res.status(400).send({ success: false, msg: err });
    }
});

router.delete("/deleteUser/:userId", async (req, res) => {
    const filter = { _id: req.params.userId };

    const result = await user.deleteOne(filter);
    if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "User Deleted" });
    } else {
        res.status(200).send({ success: false, msg: "User Not Found" });
    }
});

module.exports = router;
