class ExceptionDatabase extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExceptionDatabase';
    }
}

module.exports = ExceptionDatabase;