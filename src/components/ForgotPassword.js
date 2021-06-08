import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { passwordReset } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //   เดี๋ยวมาทำให้เป็น promise ดีๆ
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await passwordReset(emailRef.current.value);
      setMessage("Check your email in box");
    } catch (error) {
      setError("Failed to Reset Password");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                className="mb-2"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Login </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
