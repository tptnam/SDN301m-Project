const stylePartyModel = require("../database/Schemas/StyleParty.js");


const CatchAsyncErrors = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

const getAllStyleParties = CatchAsyncErrors(
    async (req, res, next) => {
        try {
            const styleParties = await stylePartyModel.find({});
            if (!styleParties) {
                return res.status(404).json({
                    success: false,
                    message: 'Style party not found'
                });
            }
            return res.status(200).json({
                success: true,
                styleParties,
                message: 'Get all style party succesfully!'
            })
        } catch (error) {
            next(error);
        }
    }
)


const getStylePartyById = CatchAsyncErrors(async (req, res, next) => {
    try {
        const stylePartyId = req.params.id;
        console.log('Style Party:', stylePartyId);

        const styleParty = await stylePartyModel.findById(stylePartyId);
        if (!styleParty) {
            return res.status(404).json({
                success: false,
                message: 'Style party not found'
            });
        }
        return res.status(200).json({
            success: true,
            styleParty,
            message: 'Get style party by ID successfully'
        });
    } catch (error) {
        next(error);
    }
});

const createStyleParty = CatchAsyncErrors(
    async (req, res, next) => {
        try {
            const { name, description, status } = req.body;
            const styleParty = await stylePartyModel.create({
                name,
                description,
                status
            })
            if (!styleParty) {
                return res.status(404).json({
                    success: false,
                    message: 'Package not found'
                });
            }
            return res.status(200).json({
                success: true,
                styleParty,
                message: 'Create a new style party successfully!'
            })
        } catch (error) {
            next(error);
        }
    }
)

const updateStyleParty = CatchAsyncErrors(
    async (req, res, next) => {
        try {
            const stylePartyId = req.params.id;
            const { name, description, status} = req.body;
            const styleParty = await stylePartyModel.findByIdAndUpdate(stylePartyId, req.body);
            const updatedStyleParty = await stylePartyModel.findById(stylePartyId);
            return res.status(200).json({
                success: true,
                updatedStyleParty,
                message: 'Update a style party successfully!'
            })
        } catch (error) {
            next(error);
        }
    }
)

const deleteStyleParty = CatchAsyncErrors(
    async (req, res, next) => {
        try {
            const stylePartyId = req.params.id;
            const styleParty = await stylePartyModel.findByIdAndDelete(stylePartyId);
            return res.status(200).json({
                success: true,
                styleParty,
                message: 'Delete a style party successfully!'
            })
        } catch (error) {
            next(error);
        }
    }
)



module.exports = {
    getAllStyleParties,
    getStylePartyById,
    createStyleParty,
    updateStyleParty,
    deleteStyleParty
}