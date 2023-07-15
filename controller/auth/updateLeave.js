import query from "../../db/index.js";

const updateLeave = async (req, res) => {


  try {
    const { typeofleave, datestart, dateend, reason } = req.body;
    console.log(req.user);

    const dbRes = await query(
      "UPDATE users SET typeofleave = $1, datestart = $2, dateend = $3, reason = $4 WHERE id = $5",
      [typeofleave, datestart, dateend, reason, req.user.id]
    );

    const serverRes = {
      message: "Leave request updated successfully",
    };
    res.status(200).json(serverRes);
  } catch (error) {
    const { name, table, constraint, detail } = error;
    const serverRes = {
      message: detail,
      error: { name, table, constraint },
    };
    res.status(500).json(serverRes);
  }
};

export default updateLeave;
