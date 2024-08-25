export const loggingManager = (req, res, next) => {
    console.log(`Request method: ${req.method}, request url: ${req.url}`);
    next();
}