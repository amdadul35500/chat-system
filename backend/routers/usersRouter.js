const router = require("express").Router();
const multer = require("multer");
const { login, logout } = require("../controllers/loginController");
const { signup } = require("../controllers/signupController");
const { getAllUser } = require("../controllers/getAllUser");
const { getSingleUser } = require("../controllers/getSingleUser");
const { profileUpdate } = require("../controllers/profileUpdateController");
const { googleLogin } = require("../controllers/googleLoginController");
const {
  getGoogleLoginUser,
} = require("../controllers/googleLoginUserController");

// sign up
router.post("/singup", signup);

// sign in
router.post("/signin", login);

// sign in google
router.get("/signin/google", googleLogin);

// current user
router.get("/google/getLoginUser/:email", getGoogleLoginUser);

//sign out
router.get("/signout", logout);

// get all user of whole chat system
router.get("/", getAllUser);

// get single user
router.get("/:id", getSingleUser);

// user update
router.put("/update/:id", profileUpdate);

// photo upload
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/images");
  },
  filename: (req, file, cd) => {
    cd(null, req.body.name);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File uploaded successfully!");
  } catch (error) {
    res.status(500).send("There was a server problem!");
  }
});

module.exports = router;
