// Controller for creating threads - PROTECTED
export const createThreadController = async (req, res) => {
    const { title, content, userid } = req.body;

    // Insert a new thread
    const data = await supabase
        .from('threads')
        .insert([{ title, content, userid: userid }]); // Ensure this is the correct foreign key column

    if (data.error) {
        return res.status(401).json({ error: error.message });
    } else {
        // If the thread is created successfully, update the 'last_seen' in the 'profiles' table
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ last_seen: new Date().toISOString() })
            .eq('uid', userid); // 'id' should match the foreign key column in 'profiles'

        if (profileError) {
            // Log this error, but don't fail the whole operation because the main action (thread creation) was successful
            console.error('Error updating last_seen:', profileError.message);
        }

        // Respond with the created thread data
        res.status(201).json(data);
    }
};


export const getRecentThreads = async (req, res) => {
    const { data, error } = await supabase
        .from('threads')
        .select(`
            *,
            profiles:userid (uid, name)  // Assuming 'userid' is the foreign key that links to 'profiles.uid'
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching threads:', error);
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
};
