const pool = require("../config/database.js")

exports.createComment = async (req, res) => {
  try {
    const { content, post_id, user_id } = req.body
    const result = await pool.query(
      `INSERT INTO comments(content, post_id, user_id)
       VALUES($1,$2,$3) RETURNING *`,
      [content, post_id, user_id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).send("Server error")
  }
}

exports.getComments = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, u.first_name, u.last_name, p.title
       FROM comments c
       JOIN users u ON c.user_id=u.id
       JOIN posts p ON c.post_id=p.id`
    )
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Server error")
  }
}

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT c.*, u.first_name, u.last_name, p.title
       FROM comments c
       JOIN users u ON c.user_id=u.id
       JOIN posts p ON c.post_id=p.id
       WHERE c.id=$1`,
      [id]
    )
    if (result.rows.length === 0) return res.status(404).send("Comment not found")
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).send("Server error")
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query("DELETE FROM comments WHERE id=$1", [id])
    res.send("Comment deleted")
  } catch (err) {
    res.status(500).send("Server error")
  }
}
