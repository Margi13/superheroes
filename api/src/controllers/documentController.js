const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const documentService = require('../services/documentService');

router.get('/copyright/list', async (req, res) => {
    try {
        const copyrights = await documentService.getAllCopyrights();
        return res.json(copyrights)
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.get('/use-right/list', async (req, res) => {
    const response = req.query.response;
    try {
        let useRights;
        if (response == undefined) {
            useRights = await documentService.getAllUseRights();
        } else {
            useRights = await documentService.getAllUseRightsByResponse(response.toString() === 'true');
        }
        return res.json(useRights)
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.get('/copyright/:id', async (req, res) => {
    try {
        const documentId = req.params.id;
        const copyright = await documentService.getOneCopyright(documentId);
        return res.json(copyright)
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.get('/use-right/:id', async (req, res) => {
    try {
        const documentId = req.params.id;
        const useRight = await documentService.getOneUseRight(documentId);
        return res.json(useRight)
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.get('/copyright', async (req, res) => {
    try {
        const { dataId, ownerId, type } = req.query;
        let copyright = await documentService.getFilteredCopyright(dataId, ownerId, type);
        if (!copyright || copyright.length === 0) {
            const document = await documentService.createCopyright({ dataId: dataId, dataType: type, _userId: ownerId })
            if (document) {
                return res.json(document);
            } else {
                return res.json({
                    type: "error",
                    message: "Cannot create copyright"
                });
            }
        }
        return res.json(copyright[0])
    } catch (error) {
        console.log(error);
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.get('/use-right', async (req, res) => {
    try {
        const { dataId, dataOwnerId, docOwnerId } = req.params.id;
        const useRight = await documentService.getFilteredUseRight(dataId, dataOwnerId, docOwnerId);
        return res.json(useRight[0])
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.delete('/copyright/:id', isAuth, async (req, res) => {
    try {
        const documentId = req.params.id;
        await documentService.deleteCopyright(documentId);
        return res.json({ ok: true });
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.delete('/use-right/:id', isAuth, async (req, res) => {
    try {
        const documentId = req.params.id;
        await documentService.deleteUseRight(documentId);
        return res.json({ ok: true });
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});

router.post('/copyright', isAuth, async (req, res) => {
    if (!req.user) {
        return res.json({
            type: "error",
            message: "User is not found!"
        });
    }
    const documentData = req.body;
    documentData._createdOn = new Date();
    documentData._userId = req.user._id;
    try {
        const document = await documentService.createCopyright(documentData);
        if (document) {
            return res.json(document);
        } else {
            return res.json({
                type: "error",
                message: "Cannot create copyright"
            });
        }
    } catch (error) {
        console.log(error)
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
router.post('/use-right', isAuth, async (req, res) => {
    if (!req.user) {
        return res.json({
            type: "error",
            message: "User is not found!"
        });
    }
    const documentData = req.body;
    documentData._createdOn = new Date();
    documentData._docOwnerId = req.user._id;
    trimData(documentData);
    try {
        const document = await documentService.createUseRight(documentData);
        if (document) {
            return res.json(document);
        } else {
            return res.json({
                type: "error",
                message: "Cannot create use right document"
            });
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});

router.put('/use-right/:id', isAuth, async (req, res) => {
    const documentId = req.params.id;
    const { data, finalDocument } = req.body;
    const documentData = {
        ...data,
        _updatedOn: finalDocument === true ? data._updatedOn : new Date()
    }
    trimData(data);
    try {
        const document = await documentService.updateUseRight(documentId, documentData);
        if (document) {
            return res.json(document);
        } else {
            return res.json({
                type: "error",
                message: "Cannot update use right document"
            });
        }
    } catch (error) {
        return res.json({
            type: 'error',
            message: error.message
        })
    }
});
const trimData = (document) => {
    document.message = (document.message || '').trim();
}

module.exports = router;