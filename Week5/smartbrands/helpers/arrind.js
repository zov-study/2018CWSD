module.exports = {
var nameIndex = 0;
Handlebars.registerHelper('name_with_index', function() {
  nameIndex++;
  return this.name + " is " + nameIndex;
})
}