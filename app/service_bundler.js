const fs = require("fs");


const BundleServices = function(application){
    const services = {};    

    const path = `${__dirname}/../services`;
    console.log("Bundling Services")
    function getServicesFiles(path){
        fs.readdirSync(path).forEach(function(file) {
            const serviceFile = `${path}/${file}`; 

            try {
                services[require(serviceFile).name] = require(serviceFile)(application);
            } catch(error){
                console.log(error);
            }
            
        })
    }

    getServicesFiles(path);
    console.log("Finished Bundling Services");
    return services;
}


module.exports = BundleServices;