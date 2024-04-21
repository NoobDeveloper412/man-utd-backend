// Middleware to update the last seen time for a user
export const updateLastSeenMiddleware = async (req, res, next) => {
    // You can add logic to throttle this update, e.g., only update if last_seen is older than X minutes
    if (req.user) {
        const { id } = req.user;
        const { error } = await supabase
            .from('profiles')
            .update({ last_seen: new Date().toISOString() })
            .eq('id', id);

        // Log errors if any, but don't block the request
        if (error) console.error('Error updating last seen:', error.message);
    }
    next();
};

