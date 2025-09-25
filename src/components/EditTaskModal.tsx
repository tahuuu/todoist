import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Task } from '../interfaces';

interface EditTaskModalProps {
  show: boolean;
  handleClose: () => void;
  task: Task;
  editTask: (id: number, updates: { text: string; dueDate: string; priority: string }) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ show, handleClose, task, editTask }) => {
  const [newText, setNewText] = useState(task.text);
  const [newDueDate, setNewDueDate] = useState(task.dueDate || '');
  const [newPriority, setNewPriority] = useState(task.priority || 'Medium');

  const handleSave = () => {
    editTask(task.id, { text: newText, dueDate: newDueDate, priority: newPriority });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
