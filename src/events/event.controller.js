export const listEvent = (req,res) =>{
    res.send("Event list");
}
export const updateEvent = (req,res) =>{
    res.send("Event update");
}
export const addEvent = (req,res) =>{
    res.send("Event Add");
}
export const deleteEvent = (req,res) =>{
    res.send("Event Add");
}
export const getEvent = (req,res) =>{
    res.send("Event getEvent");
}
export const approveEvent = (req,res) =>{
    res.send("Event approve Action");
}

export const statusChangeEvent = (req,res) =>{
    res.send(`Event status Change Action ${req.body.status}`);
}
export const addInterestedUserInEvent = (req,res) =>{
    res.send(`Event add Interested User Action ${req.body.user}`);
}