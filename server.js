const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/tasks', (req, res) => {
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading tasks file');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading tasks file');
    } else {
      const tasks = JSON.parse(data);
      tasks.push(newTask);
      fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
        if (err) {
          res.status(500).send('Error writing tasks file');
        } else {
          res.status(201).send('Task added');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});