import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarsDisplay from './StarsDisplay';
import { Button, Form, Container, Row, Col, ListGroup, Badge } from 'react-bootstrap';

function ViewAllFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    axios.get('/Nisal/feedbacks/')
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedbacks:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/Nisal/feedbacks/${id}`)
      .then(() => {
        setFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback._id !== id));
        alert('Feedback deleted successfully!');
      })
      .catch(error => {
        console.error('Failed to delete feedback:', error);
        alert('Error deleting feedback');
      });
  };

  const handleUpdate = (id) => {
    navigate(`/ManageFeedBack/${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.product && feedback.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>
      <Form.Group as={Row} className="mb-6">
        <Col sm={4}>
          <Form.Control
            type="text"
            placeholder="Search by product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded px-4 py-2 w-full shadow-sm"
          />
        </Col>
      </Form.Group>
      <ListGroup>
        {filteredFeedbacks.map(feedback => (
          <ListGroup.Item key={feedback._id} className="mb-4">
            <Row className="align-items-center">
              <Col md={4}>
                <h3 className="text-xl font-semibold">{feedback.product}</h3>
                <p className="text-gray-600 mb-2">{feedback.feedback}</p>
                <StarsDisplay rating={feedback.rating} />
              </Col>
              <Col md={4}>
                <Badge 
                  bg={feedback.status === 'Pending' ? 'warning' : feedback.status === 'Approved' ? 'success' : 'danger'}
                  className="text-uppercase"
                >
                  {feedback.status}
                </Badge>
              </Col>
              <Col md={4}>
                <Button variant="success" onClick={() => handleUpdate(feedback._id)} className="mr-2">Update</Button>
                <Button variant="danger" onClick={() => handleDelete(feedback._id)}>Delete</Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default ViewAllFeedbacks;