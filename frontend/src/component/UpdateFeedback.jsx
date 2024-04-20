import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating ';
import { Card, Form, Button, Container } from 'react-bootstrap';

function UpdateFeedback() {
  const [feedbackData, setFeedbackData] = useState({
    product: '',
    feedback: '',
    rating: 1
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/Nisal/feedbacks/${id}`)
      .then(response => {
        setFeedbackData({
          ...feedbackData,
          feedback: response.data.feedback,
          rating: response.data.rating,
          product: response.data.product
        });
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }, [id]);

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
    axios.put(`/Nisal/feedbacks/update/${id}`, feedbackData)
      .then(response => {
        alert('Feedback updated successfully!');
        navigate('/view-feedbacks');
      })
      .catch(error => {
        if (error.response && error.response.data) {
          alert('Error: ' + error.response.data.message);
        } else {
          alert('Error updating feedback');
        }
      });
  };

  return (
    <Container className="mt-10">
      <Card className="w-full md:w-3/4 lg:w-1/2 mx-auto">
        <Card.Body>
          <Card.Title className="text-2xl font-semibold mb-4">Update Feedback</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="block text-sm font-medium text-gray-600">Product:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="product"
                value={feedbackData.product}
                onChange={handleInputChange}
                readOnly
                className="border rounded px-3 py-2 w-full mt-1"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="block text-sm font-medium text-gray-600">Feedback:</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="feedback"
                value={feedbackData.feedback}
                onChange={handleInputChange}
                placeholder="Write your feedback here"
                className="border rounded px-3 py-2 w-full mt-1"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="block text-sm font-medium text-gray-600">Rating:</Form.Label>
              <StarRating rating={feedbackData.rating} onRatingChange={handleRatingChange} />
            </Form.Group>

            <Button variant="primary" type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update Feedback</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UpdateFeedback;
