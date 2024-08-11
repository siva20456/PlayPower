const db = require('../models/db');

exports.createAssignment = async (req, res) => {
  const { title, description, dueDate, createdBy } = req.body;
  try {
    db.run("INSERT INTO assignments (title, description, due_date, created_by) VALUES (?, ?, ?, ?)", [title, description, dueDate, createdBy], (err) => {
      if (err) {
        console.error('Error inserting sample Assignment data:', err);
      } else {
        console.log('Ass data inserted');

      }
    });
    res.status(200).send({ data:'Added' });

  } catch (error) {
    res.status(500).json({ error: 'Failed to create assignment' });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    db.all('SELECT * FROM assignments', async (err, rows) => {
      if (err) {
        console.error('Error retrieving assignments:', err);
        return;
      }
      console.log('Assigns data:', rows);
      res.send({rows})
      
    });
    // res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
};

exports.updateAssignment = async (req, res) => {
  const { id,title, description, dueDate,createdBy } = req.body;
  try {
    db.run("UPDATE assignments SET title = ?, description = ?, due_date = ?,created_by = ? WHERE id = ? ", [title, description, dueDate, createdBy,id], (err) => {
      if (err) {
        console.error('Error updating sample Assignment data:', err);
      } else {
        console.log('Ass data updated');

      }
    });
    res.status(200).send({ data:'Updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update assignment' });
  }
};

exports.deleteAssignment = async (req, res) => {
  const { id } = req.body;
  try {
    db.run("DELETE FROM assignments WHERE id = ? ", [id], (err) => {
      if (err) {
        console.error('Error deleting sample Assignment data:', err);
      } else {
        console.log('Assign data deleted');

      }
    });
    res.status(200).send({ data:'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
};
