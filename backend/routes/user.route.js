const express = require('express');
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const auth = require('../middlewares/authMiddleware');
const { registerUser, loginUser,getUser,updateUser } = require('../controllers/authController');

const router = express.Router();

// Register a user
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  registerUser
);

// Login a user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  loginUser
);

router.put(
  "/updateUser",
  auth,
  [
    // Validate fields only if they are present in the request
    check("userName")
      .optional()
      .not()
      .isEmpty()
      .withMessage("userName is required"),
    check("email")
      .optional()
      .isEmail()
      .withMessage("Please include a valid email"),
    check("newPassword")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the updateUser controller function
    updateUser(req, res);
  }
);

router.get("/getUser", auth, getUser);

module.exports = router;
