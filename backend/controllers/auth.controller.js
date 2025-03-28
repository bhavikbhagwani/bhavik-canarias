import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req, res) => {
    try{

        const {fullName, email, password, confirmPassword} = req.body;

        if (password !== confirmPassword){
            return res.status(400).json({error: "Passwords don't match"})
        }

        const user = await User.findOne({email});

        if (user) {
            return res.status(400).json({error: "Email already exists"})
        }

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            userBookings: []
        })

        if (newUser){
            // Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                userBookings: newUser.userBookings,
            })


        } else {
            res.status(400).json({error: "Invalid user data"})
        }

    } catch (error){
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }

}

export const login = async (req, res) => {
    try{

        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json({error: "Email not found"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

        if (!isPasswordCorrect){
            return res.status(400).json({error: "Invalid email or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        });

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const logout = (req, res) => {
    try{

        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged out successfully"})

    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}