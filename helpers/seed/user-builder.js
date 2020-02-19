require('dotenv').config();

const axios = require("axios");
const _ = require("lodash");





async function getUsers() {
    return await axios.get('https://randomuser.me/api/?results=100')
      .then(data => {
          let seeds = [];
          let users = data.data.results;
        
         _.forEach(users, (user) => {
             seeds.push({ 
                 email: user.email, 
                 fullName: `${user.name.first} ${user.name.last}`, 
                 username: user.login.username, 
                 profile_pic: user.picture.medium,
                 password: process.env.SEED_USER_PASSWORD,
                 createdAt: new Date(),
                 updatedAt: new Date()
             })
        })
        return seeds;
      }) 
      .catch(error => {
         console.log(error)
      })
};


module.exports = {getUsers};