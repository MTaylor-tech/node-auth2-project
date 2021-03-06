const jwt = require("jsonwebtoken")


function restrict(level) {
	return async (req, res, next) => {
		const authError = {
			message: "You shall not pass!",
		}

		try {
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json(authError)
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
				}

				if (level>0 && decoded.department !== "admin") {
					return res.status(401).json(authError)
				}

				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict
