
let Blog = require("../models/Blog");
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
chai.should();

chai.use(chaiHttp);

describe("Blogs", () => {
  beforeEach((done) => {
    Blog.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/GET blog", () => {
    it("it should GET all the blogs", (done) => {
      chai
        .request(app)
        .get("/api/blogs")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST blog", () => {
    it("it should new POST a blog", (done) => {
      let blog = {
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      };
      chai
        .request(app)
        .post("/api/blogs")
        .send(blog)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });
  describe("/GET/:id blog", () => {
    it("it should GET a blog by the id", (done) => {
      let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      });
      blog.save((err, blog) => {
        chai
          .request(app)
          .get("/api/blogs/" + blog.id)
          .send(blog)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/PUT/:id blog", () => {
    it("it should UPDATE a blog given the id", (done) => {
      let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      });
      blog.save((err, blog) => {
        console.log(blog.id);
        chai
          .request(app)
          .put("/api/blogs/" + blog.id)
          .send({
            title: "The first blog was updated",
            body: "This is a blog post",
            image:
              "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/DELETE/:id blog", () => {
    it("it should DELETE a blog given the id", (done) => {
      let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      });
      blog.save((err, blog) => {
        chai
          .request(app)
          .delete("/api/blogs/" + blog.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
});
