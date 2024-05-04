import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating ';
import { Card, Form, Button, Container } from 'react-bootstrap';

function AddFeedback() {
  const [feedbackData, setFeedbackData] = useState({
    product: '',
    feedback: '',
    rating: 1,
    status: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Assume we fetch product name from an API or use a static name
    const productName = "Auto-detected Product";
    setFeedbackData(prevData => ({ ...prevData, product: productName }));
  }, []);

  const handleInputChange = (event) => {
    setFeedbackData({
      ...feedbackData,
      [event.target.name]: event.target.value
    });
  };

  const handleRatingChange = (newRating) => {
    setFeedbackData({ ...feedbackData, rating: newRating });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('Nisal/feedbacks/add', feedbackData)
      .then(response => {
        alert('Feedback added successfully!');
        setFeedbackData({ product: '', feedback: '', rating: 1 });
      })
      .catch(error => {
        alert('Error: ' + error.response.data);
      });
  };

  return (
    <Container className="mt-16 flex justify-center items-center h-screen">
      <Card className="w-full max-w-lg">
        <Card.Body>
          <Card.Title className="text-2xl font-bold mb-6">Add Feedback</Card.Title>
          <Form onSubmit={handleSubmit} className="space-y-4">
            <Form.Group className="mb-4">
              <Form.Label className="block text-sm font-medium text-gray-600">Product:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="product"
                value={feedbackData.product}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="block text-sm font-medium text-gray-600">Feedback:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="feedback"
                value={feedbackData.feedback}
                onChange={handleInputChange}
                placeholder="Write your feedback here"
                className="mt-1 p-2 border rounded-md w-full"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="block text-sm font-medium text-gray-600">Rating:</Form.Label>
              <StarRating rating={feedbackData.rating} onRatingChange={handleRatingChange} />
            </Form.Group>

            <Button variant="success" type="submit" className="w-full">
              Submit Feedback
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddFeedback;