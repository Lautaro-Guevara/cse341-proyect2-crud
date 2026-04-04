const isAuthenticated = (req, res, next) => {
    if (req.session.user == undefined) {
        return res.status(401).json({ message: "You don't have access to this resource" });
    }
    next();
};


module.exports = {
    isAuthenticated
}