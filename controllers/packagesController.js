// const packageModel = require("../database/Schemas/Packages.js");

// // Define CatchAsyncErrors middleware inline
// const CatchAsyncErrors = (fn) => {
//     return (req, res, next) => {
//         Promise.resolve(fn(req, res, next)).catch(next);
//     };
// };

// const getAllPackages = CatchAsyncErrors(async (req, res, next) => {
//     try {
//         const packages = await packageModel.find({});
//         return res.status(200).json({
//             success: true,
//             packages,
//             message: 'All packages retrieved successfully'
//         });
//     } catch (error) {
//         // Handle the error appropriately, for example, call the next middleware
//         next(error);
//     }
// });


// module.exports = {
//     getAllPackages
// };
const packageModel = require("../database/Schemas/Packages.js");

const getAllPackages = async (req, res, next) => {
    try {
        const packages = await packageModel.find({});
        return res.status(200).json({
            success: true,
            packages,
            message: 'All packages retrieved successfully'
        });
    } catch (error) {
        // Handle the error appropriately, for example, log it
        console.error('Error in getAllPackages:', error);
        // Respond with an error message
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
        // Alternatively, you can call the next middleware with the error
        // next(error);
    }
};

module.exports = {
    getAllPackages
};
