const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

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
          res.status(201).send('Task added successfully');
        }
      });
    }
  });
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading tasks file');
    } else {
      const tasks = JSON.parse(data);
      const taskIndex = tasks.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;

        fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
          if (err) {
            res.status(500).send('Error writing tasks file');
          } else {
            res.status(200).send('Task updated successfully');
          }
        });
      } else {
        res.status(404).send('Task not found');
      }
    }
  });
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading tasks file');
    } else {
      const tasks = JSON.parse(data);
      const taskIndex = tasks.findIndex(task => task.id === taskId);

      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);

        fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
          if (err) {
            res.status(500).send('Error writing tasks file');
          } else {
            res.status(200).send('Task deleted successfully');
          }
        });
      } else {
        res.status(404).send('Task not found');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});