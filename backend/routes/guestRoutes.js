const router = require("express").Router();
const { getAllGuests, viewProfile, getCurrentGuests, updateGuestById, makeNewGuest, getBunkReservations } = require("../controllers/guestController");

const { requireAuth } = require("../middleware/authMiddleware");

router.get("/all", requireAuth, getAllGuests);

router.get("/viewProfile/:id", requireAuth, viewProfile);

router.get("/current", requireAuth, getCurrentGuests);

router.put("/update", requireAuth, updateGuestById);

router.post("/new", requireAuth, makeNewGuest);

router.get("/reservations", requireAuth, getBunkReservations);

module.exports = router;