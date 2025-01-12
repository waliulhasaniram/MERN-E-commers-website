const asyncHandeler =(fn)=> async(req, res, next)=>{ // helper function
    try {
        return await fn(req, res, next)
    } catch (err) {
        res.status(err.code || 500).json({success:false, message: err.message})
    }
}

module.exports = asyncHandeler