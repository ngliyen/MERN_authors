const AuthorController = require("../controllers/author.controller");

module.exports = (app) => {
  app.get("/api", AuthorController.index);
  app.post("/api/authors", AuthorController.createAuthor);
  
  //READ
  app.get("/api/authors", AuthorController.getAllAuthors);
  app.get("/api/authors/:id", AuthorController.getAuthorById);

  //UPDATE
  app.put("/api/authors/:id", AuthorController.updateAuthor);

  //DELETE
  app.delete("/api/authors/:id", AuthorController.deleteAuthorById);
}