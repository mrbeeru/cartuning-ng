var mongoose = require("mongoose");

const ecufileModel = {   
    content: String,
}  

const ecufileSchema = new mongoose.Schema(ecufileModel);
const EcuFile = mongoose.model('ecufiles', ecufileSchema);

module.exports = {EcuFile: EcuFile}