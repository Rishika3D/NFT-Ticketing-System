export const signUp = async (req, res) => {
    try {
      const { userName, email, password } = req.body;
  
      if (!userName || !email || !password) {
        return res.status(400).json({
          message: "All fields are required"
        });
      }
  
      const result = await db.query(
        `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email
        `,
        [userName, email, password]
      );
  
      res.status(201).json({
        message: "User signed up successfully",
        user: result.rows[0]
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Sign up failed" });
    }
  };
  

export const login= async(req, res)=>{
    try{
        const { email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const result = await db.query(
            `SELECT * FROM user WHERE email = $1 AND password = $2`,
            [email, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({ message: "Login failed" });
        console.log(err.message);
    }
}