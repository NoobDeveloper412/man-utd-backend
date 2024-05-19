import jwt from 'jsonwebtoken';

// User signup
const signupController = async (req, res) => {
    const { email, password, name } = req.body;
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password, name });
    const { user, session } = data

    if (signUpError) {
        return res.status(401).json({ error: signUpError.message });
    } else {
        // Here, handle the case where the user is created but we want to insert additional profile data
        if (user) {
            // Insert additional profile data into the 'profiles' table
            const response = await supabase
                .from('profiles')
                .insert([
                    { uid: user.id, password: password, name: name, email: email, last_seen: new Date().toISOString(), created_at: new Date().toISOString() }
                ]);

            const { error, status, statusText } = response

            console.log("***************", response, user.id)
            if (error) {
                // Handle the case where user is created but profile information could not be inserted
                return res.status(500).json({ error: error.message });
            }

            // Create a token
            const token = jwt.sign(
                { email: user.email, id: user.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '24h' }
            );

            res.status(status).json({ token, user, statusText, session });
        }
    }
};


// User login
const loginController = async (req, res) => {
    const { email, password } = req.body;
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    console.log(data, signInError)

    if (signInError) {
        return res.status(401).json({ error: signInError.message });
    } else if (data) {
        const { user, session } = data;

        // Create a token
        const token = jwt.sign(
            { email: user.email, id: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '48h' }
        );


        res.status(200).json({ token, user, session });
    } else {
        res.status(500).json({ message: 'Authentication failed without error.' });
    }
};



// Get user profile
const userProfileController = async (req, res) => {
    const { data: user, error } = await supabase.auth.api.getUser(req.token);

    if (error) return res.status(401).json({ error: error.message });
    res.status(200).json({ user });
};

const updateLastSeenController = async (req, res) => {
    const { userid } = req.body;
    // Check if the authenticated user is the same as the user to update
    if (req.user.id !== userid) {
        return res.status(403).json({ success: false, message: 'Unauthorized to update this user.' });
    }
    const { error: profileError } = await supabase
        .from('profiles')
        .update({ last_seen: new Date().toISOString() })
        .eq('uid', userid); // 'id' should match the foreign key column in 'profiles'


    console.log("Updated last seen.")
    if (profileError) {
        res.status(500).json({ success: false, message: 'Failed to update last seen.' });
    } else {
        res.status(200).json({ success: true, message: 'Last seen updated successfully.' });
    }
};

export { userProfileController, loginController, signupController, updateLastSeenController }