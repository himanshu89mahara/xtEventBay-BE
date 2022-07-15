export const nominationList = (req,res) =>{
    res.send("Nomination List");
}
export const nominationAdd = (req,res) =>{
    res.send("Nomination Add");
}
export const nominationDetail = (req,res) =>{
    res.send("Nomination Detail");
}
export const nominationUpdate = (req,res) =>{
    res.send("Nomination Update");
}
export const nominationDelete = (req,res) =>{
    res.send("Nomination Delete");
}
export const nominationUpVote = (req,res) =>{
    res.send("Nomination UpVote");
}
export const nominationApprove = (req,res) =>{
    res.send("Nomination Approve");
}
export const nominationStatus = (req,res) =>{
    res.send(`Nomination Status: ${req.body.status}`);
}
export const nominationDocument = (req,res) =>{
    res.send(`Nomination Document`);
}