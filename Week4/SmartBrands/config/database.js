if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI:
    'mongodb://brad:brad@ds141454.mlab.com:41454/smartbrands'}
} else {
    module.exports = {mongoURI:'mongodb://localhost/smartbrands'}
}