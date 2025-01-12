const {Schema, model} = require("mongoose")
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const commentSchema = new Schema({
    commentText : {
        type: String,
        trim: true,
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "UserData"
    },

    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
},{
    timestamps: true
})

commentSchema.plugin(aggregatePaginate)

const Comment = new model("comment", commentSchema)

module.exports = Comment