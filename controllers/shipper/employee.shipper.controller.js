const employeeShipperModel = require('../../models/shipper/employee.shipper.model');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const loginResult = await employeeShipperModel.login(username, password);
        if (loginResult.length > 0) {
            res.json({ status: "success", user: loginResult[0] });
        } else {
            res.json({ status: "falied", user: null });
        }
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { fullname, phoneNumber, username } = req.body;
        const data = {
            fullname,
            phoneNumber,
            username
        }
        await employeeShipperModel.updateProfile(data);
        res.json({ status: "success" });
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}

const updatePassword = async (req, res) => {
    try {
        const { username, passwordNew } = req.body;
        await employeeShipperModel.updatePassword(username, passwordNew);
        res.json({ status: "success" });
    } catch (error) {
        console.log(error);
        res.json({ status: "erorr" });
    }
}


module.exports = {
    login,
    updateProfile,
    updatePassword
}