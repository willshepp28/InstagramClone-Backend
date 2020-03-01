require('dotenv').config()

const _ = require("lodash");
const axios = require("axios");
const deepai = require('deepai'); 

deepai.setApiKey(process.env.DEEPAI_APIKEY);




/**
 * 
 * 
 *  The goal is to create posts then add them to the database
 * 
 * 1. load  500 random pictures from pixabay
 * 2. create a object, for each image returned by that request
 * 3. In that object assign the image.largeImageUrl to a photo propery in that object
 * 4. Push that object to the posts array
 * 
 * 
 * 1. Create a function that reads each photo property in that array , and assigns them the appropiate caption
 * 
 */


const _state = {
    posts: [],
    count: 0,
    user_id: 1,
    totalUserIds: 6,
    loremIpsum: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    resetCount: () => {
        _state.count = 0;
    },
    addCount: () => {
        _state.count++;
    },
    moveToNextUserId: () => {
        _state.user_id++;
    }
};





// loads the pictures, adds them to post array, then invokes addCaption
const loadPictures = async (amountOfUsers) => {

    _state.totalUserIds = amountOfUsers;
    const picsToRender = amountOfUsers * 2; // to assign 2 posts for each user in the db we need to render at least double the amount of users passed in
 
    return axios.get(`https://pixabay.com/api/?key=${process.env.PIXABAY_APIKEY}&page=2&per_page=${picsToRender}&min_width=500&min_height=500&safesearch=true`)
        .then((data) => {
           
            let images  = data.data.hits;
            images.map(async(image) => {
                await _state.posts.push({ photo: image.largeImageURL});
            })
        }).then(async () => { 
            await addCaption();
        }).then(() => {
            return _state.posts;
        })
};


// lopping over posts to give a caption to each picture
const addCaption  = async() => {
    const transformedPosts = _state.posts.map(async(post) => {
        // console.log(post);
        const captions = await createCaption(post.photo);

        post.caption = await captions.output.captions[0].caption || captions.output.captions[2].caption || loremIpsum  ;
    })

    await Promise.all(transformedPosts).then(() => {
        addUserIds();
    });
}


const createCaption = async(image) => {
        return await deepai.callStandardApi("densecap", {
            image: image,
        })
};



// totalUserid denotes the total amount of users in the database
// postsPserUserId denotes the amount of posts that will be assigned to each userId
const addUserIds = () => {

    const add = _state.posts.map(async(post, index) => {

        if( _state.user_id <= _state.totalUserIds) {
            if(_state.count >= 2) {
                _state.resetCount();
                _state.moveToNextUserId();
            }
            // post.user_id = _state.user_id;
            _state.posts[index].user_id = _state.user_id;
            addCreatedAndUpdateDates(index);
        } 
        _state.addCount();
    })


  Promise.all(add).then(() => {
      console.log("Setup of posts complete")
  });

};


const addCreatedAndUpdateDates = (index) => {
    _state.posts[index].createdAt = new Date();
    _state.posts[index].updatedAt = new Date();
}

module.exports = loadPictures;