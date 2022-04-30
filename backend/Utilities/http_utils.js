function HTTP_500() {
    return {
        status: 500,
        msg: "Internal Server Error"
    }
};

module.exports = {
    HTTP_500
}