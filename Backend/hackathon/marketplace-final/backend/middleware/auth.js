import jwt from 'jsonwebtoken';

export function getUserIdFromToken(req) {
    const authorization = req.headers.authorization || '';

    if (!authorization.startsWith('Bearer ')) {
        return null;
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId || null;
    } catch {
        return null;
    }
}

export function optionalAuth(req, res, next) {
    req.userId = getUserIdFromToken(req);
    next();
}

export function requireAuth(req, res, next) {
    const userId = getUserIdFromToken(req);

    if (!userId) {
        return res.status(401).json({
            message: 'Authentication required.'
        });
    }

    req.userId = userId;
    next();
}
