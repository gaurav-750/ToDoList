// const { parseTwoDigitYear } = require("moment");

module.exports.getDate = getDate; //exporting our getDate function

function getDate(){
    var today = new Date();

    var options = {
        weekday: "long",
        // year: "numeric",
        month: "long",
        day: "numeric"
    }

    return today.toLocaleDateString('en-US', options);
}


module.exports.getDay = getDay; //exporting our getDate function
function getDay(){
    var today = new Date();

    var options = {
        weekday: "long",
    }

    return today.toLocaleDateString('en-US', options);
}

console.log(module.exports);