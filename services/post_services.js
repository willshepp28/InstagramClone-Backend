const Post = function(){

    const findById = (state, callback) => {
        return {id: 1, caption: "Life is good"}
    }


    return {
        findById
    }
}


module.exports = Post;