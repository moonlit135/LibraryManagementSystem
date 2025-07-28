const jwt = require('jsonwebtoken');

//  Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // decoded contains { id, role, email, etc. }
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

//  Middleware for role-based access control
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: insufficient permissions.' });
        }
        next();
    };
};

//  Middleware for auto role-based redirection (API-based)
const redirectBasedOnRole = (req, res) => {
    const role = req.user.role;

    switch (role) {
        case 'Admin':
            return res.json({ redirectTo: '/admin/dashboard', role });
        case 'Professor':
            return res.json({ redirectTo: '/professor/home', role });
        case 'Student':
            return res.json({ redirectTo: '/student/home', role });
        default:
            return res.status(400).json({ message: 'Invalid role.' });
    }
};

// Middleware to protect admin routes
const protectAdmin = [
    authenticateToken,
    authorizeRoles('Admin')
];

module.exports = {
    authenticateToken,
    authorizeRoles,
    redirectBasedOnRole,
    protectAdmin,
};
