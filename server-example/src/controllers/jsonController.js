export const getJson = (req,res) =>{
    res.json({
        "shop": "Open",
        "counter":"Replies in json",
        "to": "customers"
        });
}

export const postJson = (req,res) =>{
    res.status(200).json({"messsage":"Counter has its first request"});
}

export const putJson = (req,res) =>{
    res.status(200).json({"messsage":"Counter has a request for updating"});
}

export const deleteJson = (req,res) =>{
    res.status(200).json({"messsage":"Counter has a request for deleting"});
}
