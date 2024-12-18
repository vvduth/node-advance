const moongoose = require("mongoose")
const User = moongoose.model("User")


module.exports = () => {
    return new User({

    }).save()
}