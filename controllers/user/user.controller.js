const model = require('../../models/user/user.model')

const readUser = async (req, res) => {

    try {
        const { id } = req.body;
        const results = await model.readUser(id)
        res.json({ status: "SUCCESS", user: results[0] });
    } catch (error) {
        res.json({ status: "ERROR", error });
    }

}

const updateUser = async (req, res) => {

    try {
        const { id, image, fullName } = req.body;
        const results = await model.updateUser(id, image, fullName)
        res.json({ status: "SUCCESS", results });

    } catch (error) {
        console.log(error)

        res.json({ status: "ERROR", error });
    }

}

module.exports = {
    readUser,
    updateUser
}