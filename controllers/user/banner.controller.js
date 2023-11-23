const model = require("../../models/user/banner.model")


const readBanner = async (req, res) => {

    try {
        const results = await model.readBanner()
        res.json({ status: "SUCCESS", results })
    } catch (error) {
        res.json({ status: "ERROR", error })
    }

}

module.exports = {
    readBanner
}