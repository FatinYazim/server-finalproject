import query from "../../db/index.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    const body = req.body;
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    const hashedPasswordCOnfirmation = bcrypt.hashSync(body.passwordconfirmation, salt);
    const dbRes = await query(
      "INSERT INTO users (email, username, password, isadmin, passwordconfirmation) VALUES ($1, $2, $3,$4,$5)",
      [body.email, body.username, hashedPassword,body.isadmin, hashedPasswordCOnfirmation]
    );
    const serverRes = {

      message: "A user created",
      
    };
    res.status(200).json(serverRes);
  } catch (error) {
    const { name, table, constraint, detail } = error;
    const serverRes = {
      message: "A username/password already exists.",
      error: { name, table, constraint },
    };
    res.status(500).json(serverRes);
  }
};

export default register; 