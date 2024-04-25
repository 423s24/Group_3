const router = require("express").Router();
const { getAllBunks, updateBunkByNumber, getNumbers } = require("../controllers/bunkController");

const {requireAuth} = require("../middleware/authMiddleware");

router.get("/all", requireAuth, getAllBunks);

router.put("/update", requireAuth, updateBunkByNumber);

router.get("/numbers", requireAuth, getNumbers);

module.exports = router;