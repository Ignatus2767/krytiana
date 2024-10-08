"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    var _a;
    console.log('authenticateToken middleware invoked');
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    console.log('Token found:', token);
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.status(403).json({ success: false, message: 'Invalid token.' });
        }
        console.log('Token successfully verified:', decodedToken);
        // The `decodedToken` can either be `string | JwtPayload`
        const user = decodedToken;
        // Attach user information to the request object
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
// Refresh Token Endpoint
const refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.sendStatus(401); // Unauthorized
    }
    // Verify the refresh token
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            console.log('Refresh token verification failed:', err);
            return res.sendStatus(403); // Forbidden
        }
        // Ensure decodedToken is of type CustomJwtPayload
        const customDecodedToken = decodedToken;
        // Generate a new access token
        const accessToken = jsonwebtoken_1.default.sign({ username: customDecodedToken.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.json({ accessToken });
    });
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=authMiddleware.js.map