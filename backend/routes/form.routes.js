const express = require('express');
const router = express.Router();

const { getFormsByFolderId,updateFormById,deleteFormById, getFormById,shareForm ,getSharedForm, saveFormResponse} = require('../controllers/formController');

router.get('/:folderId/forms', getFormsByFolderId);

router.get('/form/:formId', getFormById);

router.put('/form/:formId', updateFormById);
router.delete('/form/:formId', deleteFormById);

router.post('/share/:formId',shareForm);
// Route to get form by shareable link
router.get('/share/:linkId', getSharedForm);

router.post('/save-response', saveFormResponse);


module.exports = router;