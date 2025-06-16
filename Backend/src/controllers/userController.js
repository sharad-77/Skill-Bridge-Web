import User from '../models/userModel.js';

const userProfileController = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
           return res.status(404).json({
                message: 'User Not Found'
            })
        }

      return res.json({
        user: user
      })

    } catch (err) {

        return res.status(500).json({
            message: "Server error"
        })

    }
}

export default userProfileController;


