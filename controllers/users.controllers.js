const pool = require("../config/database.js")

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number, address } = req.body
    const result = await pool.query(
      `INSERT INTO users(first_name, last_name, email, password, phone_number, address)
       VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
      [first_name, last_name, email, password, phone_number, address]
    );
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).send("Server error")
  }
}


exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users")
    res.json(result.rows)
  } catch (err) {
    res.status(500).send("Server error")
  }
}

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [id])
    if (result.rows.length === 0) return res.status(404).send("User not found")
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).send("Server error")
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, address } = req.body;
    const result = await pool.query(
      `UPDATE users 
       SET first_name=$1, last_name=$2, email=$3, phone_number=$4, address=$5
       WHERE id=$6 RETURNING *`,
      [first_name, last_name, email, phone_number, address, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).send("Server error")
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.send("User deleted");
  } catch (err) {
    res.status(500).send("Server error")
  }
}
