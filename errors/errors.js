class RefreshTokenExpired extends Error {
    constructor(message) {
        super(message);
        this.name = 'RefreshTokenExpired';
    }
}

class InvalidTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidTokenError';
    }
}

module.exports = { InvalidTokenError, RefreshTokenExpired };
