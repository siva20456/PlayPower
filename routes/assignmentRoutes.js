const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.verifyToken, assignmentController.createAssignment);
router.get('/get', authMiddleware.verifyToken, assignmentController.getAssignments);
router.put('/upd', authMiddleware.verifyToken, assignmentController.updateAssignment);
router.delete('/delete', authMiddleware.verifyToken, assignmentController.deleteAssignment);

module.exports = router;
