const pool = require("../config/database.js")

exports.createPost = async (req, res) => {
  try {
    const { title, content, slug, user_id } = req.body
    const result = await pool.query(
      `INSERT INTO posts(title, content, slug, user_id)
       VALUES($1,$2,$3,$4) RETURNING *`,
      [title, content, slug, user_id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).send("Server error")
  }
};

exports.getPosts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, u.first_name, u.last_name
       FROM posts p JOIN users u ON p.user_id=u.id`
    )
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Server error")
  }
}

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT p.*, u.first_name, u.last_name
       FROM posts p JOIN users u ON p.user_id=u.id
       WHERE p.id=$1`,
      [id]
    )
    if (result.rows.length === 0) return res.status(404).send("Post not found")
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).send("Server error")
  }
}

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, slug } = req.body
    const result = await pool.query(
      `UPDATE posts SET title=$1, content=$2, slug=$3 WHERE id=$4 RETURNING *`,
      [title, content, slug, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).send("Server error")
  }
}

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query("DELETE FROM posts WHERE id=$1", [id])
    res.send("Post deleted")
  } catch (err) {
    res.status(500).send("Server error")
  }
}
