import React, {useState} from "react";
import { Form, Button,Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../services/authService";
import { handleFailure, setUser } from "../../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username : "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    firstname: "",
    lastname: "",
    gender: "", 
    dob: new Date().toISOString().split("T")[0],
  });
  

  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  

  // Xu ly thay doi gia tri cua input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xu ly submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const response = await register(formData);
        dispatch(setUser(response));
        navigate("/login");
    } catch (error) {
      
        dispatch(handleFailure(error.response.data));
        console.log(error.response.data);
    };
  };

  return (
    <div>
      <Form className="auth-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 form-group" controlId="username">
          <Form.Label className="label-input">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            className="form-control input-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {error  && <p className="text-danger">{error.message.username}</p>}

          
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="email">
          <Form.Label className="label-input">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="form-control input-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {error  && <p className="text-danger">{error.message.email}</p>}

        </Form.Group>

        {/* password */}
        <Form.Group className="mb-3 form-group" controlId="password">
          <Form.Label className="label-input">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter passowrd"
            className="form-control input-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            
          />
          {error  && <p className="text-danger">{error.message.password}</p>}
        </Form.Group>

        {/* confirm password */}
        <Form.Group className="mb-3 form-group" controlId="confirm-password">
          <Form.Label className="label-input">Comfirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm password"
            className="form-control input-password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            
          />

          {error  && <p className="text-danger">{error.message.confirmPassword}</p>}

        </Form.Group>
        
        {/* phone number */}
        <Form.Group className="mb-3 form-group" controlId="phone">
          <Form.Label className="label-input">Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter phone number"
            className="form-control input-phone"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            
          />

          {error  && <p className="text-danger">{error.message.phoneNumber}</p>}
        </Form.Group>

        {/* first name */}
        <Form.Group className="mb-3 form-group" controlId="first-name">
          <Form.Label className="label-input">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            className="form-control input-fist-name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            
          />
        {error  && <p className="text-danger">{error.message.firstName}</p>}
        </Form.Group>

        {/* last name */}
        <Form.Group className="mb-3 form-group" controlId="last-name">
          <Form.Label className="label-input">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            className="form-control input-last-name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            
          />
        {error  && <p className="text-danger">{error.message.lastName}</p>}
        </Form.Group>

        {/* gender */}
        <Form.Group className="mb-3 form-group" controlId="gender">
          <h3>Gender</h3>
          <div className="mt-2 ms-4">
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />

            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              id="check-gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              className="mt-3"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3 form-group" controlId="dob">
          <Form.Label className="label-input">Day of birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter last name"
            className="form-control input-dob"
            name="dob"
            value={formData.dob}

            onChange={handleChange}
            
          />
        {error  && <p className="text-danger">{error.message.dob}</p>}

        </Form.Group>

        <div className="d-flex align-items-center justify-content-between gap-5">
          <Button variant="primary" type="submit" size="lg">
            Create Account
          </Button>
        </div>

      </Form>
    </div>
  );
};

export default RegisterForm;
