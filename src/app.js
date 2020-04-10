const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());



const projects = [];


app.get("/repositories", (request, response) => {
  // TODO
  return response.json(projects)
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body

  const project = { id: uuid(), title, url, techs, likes: 0 }
  projects.push(project)
  return response.json(project)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params
  const { title, url, techs } = request.body
  projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex < 0) {
    return response.status(400).json({ error: "erro" })
  }



  index = projects.find(project => project.id === id);

  const project = {
    id, title, url, techs, likes: index.likes
  }

  projects[projectIndex] = project
  return response.json(project)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params
  projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex < 0) {
    return response.status(400).json({ error: "erro" })
  }
  projects.splice(projectIndex, 1)
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params
  projectIndex = projects.find(project => project.id === id);
  if (projectIndex < 0) {
    return response.status(400).json({ error: "erro" })
  }
  if (!projectIndex) return response.status(400).json({ error: "erro" })


  const project = {
    likes: projectIndex.likes += 1
  }


  return response.json(project)
});

module.exports = app;
