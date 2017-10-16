var axios = require('axios');

module.exports = {
    
    getPolls: function() {
        return axios.get('/getpolls')
            .then(function (response) {
               return response.data; 
            });
    },
    
    writePoll: function(poll) {
        return axios.post('/writepoll', poll)
            .then(function(response) {
                return response.data;
            });
    },
    
    castVote: function(poll) {
        return axios.post('/castvote', poll)
            .then(function(response) {
                return response.data;
            });
    },
    
    deletePoll: function(poll) {
        return axios.post('/deletepoll', poll)
            .then(function(response) {
               return response.data; 
            });
    }
    
}

/*Example of how to call elsewhere:

var api = require(<PATH TO THIS FILE>);

api.fetchPolls()
    .then(function (res) {
       console.log(res); 
    });
*/