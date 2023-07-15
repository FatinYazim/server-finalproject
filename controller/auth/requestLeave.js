import query from "../../db/index.js";

const requestLeave = async (req, res) => {
  try {
    const { typeofleave, fullday, datestart, dateend, reason} = req.body;
   

console.log(req.user)
    const dbRes = await query(
      "UPDATE users SET typeofleave = $1,fullday =$2, datestart = $3, dateend = $4, reason = $5 WHERE id = $6",
      [typeofleave,fullday, datestart, dateend, reason, req.user.id]
      
    );

    const serverRes = {
      message: "Leave request submitted successfully",
      
  
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

export default requestLeave;
