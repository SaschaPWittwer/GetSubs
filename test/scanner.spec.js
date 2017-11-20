var { Directory } = require("../database/schema.js");
var assert = require("assert");

describe("Directory tests", function() {
    it('should be save', function(done) {
        Directory.create({ name: "blubbi", path: "test/path"}).then(directory => {
           assert.notEqual(directory.id, 0);
           done(); 
        });
    });

    it('should apply name', function(done) {
        Directory.create({ name: "blubbi", path: "test/path"}).then(directory => {
           assert.equal(directory.name, "blubbi");
           done(); 
        });
    });

    it('should apply path', function(done) {
        Directory.create({ name: "blubbi", path: "test/path"}).then(directory => {
           assert.equal(directory.path, "test/path");
           done(); 
        });
    });

    it('should find', function(done) {
        Directory.create({ name: "blubbi", path: "test/path"}).then(directory => {
           
           Directory.findById(1).then(directory => {
               assert.equal(directory.id, 1);
               done();
           }) 
        });
    });

    it('should delete', function(done) {
        Directory.create({ name: "blubbi", path: "test/path"}).then(directory => {
            directory.destroy().then(() => {
                done();
            });
        });
    });
})