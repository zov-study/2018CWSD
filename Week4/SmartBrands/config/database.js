if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI:
    'mongodb://<dbuser>:<dbpassword>@ds221228.mlab.com:21228/mlab_db'}
} else {
    module.exports = {mongoURI:'mongodb://localhost/smartbrands'}
}