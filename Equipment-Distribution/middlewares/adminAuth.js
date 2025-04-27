function verifyAdmin(req, res, next) {
    if(!req.user){
        return res.status(401).json({message : "Unauthorized: Please login first."});
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Admins only." });
    }

    next();
}

module.exports =  verifyAdmin;