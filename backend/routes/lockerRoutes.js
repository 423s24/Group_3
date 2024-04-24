const router = require("express").Router();
const { updateLockerByNumber, getAllLocker, getNumbers } = require("../controllers/lockerController");
const { requireAuth } = require("../middleware/authMiddleware");

router.put("/update", requireAuth, updateLockerByNumber);

router.get("/all", requireAuth, getAllLocker);

router.get("/numbers", requireAuth, getNumbers);

module.exports = router;