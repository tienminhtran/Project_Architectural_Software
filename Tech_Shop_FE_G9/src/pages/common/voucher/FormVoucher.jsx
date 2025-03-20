import React, {useState} from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useVoucher from "../../../hooks/useVoucher";

 const FormVoucher = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialState = {
        name: "",
        value: 0,
        quantity: 0,
        expiredDate: ""
    };
    const vouchers = location.state?.voucher || initialState;
    console.log(vouchers);
    
    const [formData, setFormData] = useState(vouchers);
    const { createVoucher, updateVoucher } = useVoucher(0, 1);

    // Xu ly thay doi gia tri cua input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Xu ly reset form
    const handleReset = () => {
        if(vouchers.id) {
            navigate("/common/vouchers");
        } else {
            setFormData(initialState);
        }
    };

    // Xu ly submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if(vouchers.id) {
            updateVoucher(formData);
            navigate("/common/vouchers");
        } else {
            createVoucher(formData);
        }
        handleReset();
    };
       

    return (
      <div className="page-wrapper">
         <div className="page-header">
            <div className="page-title">
               <h3>Form Voucher</h3>
               <p>Fill in the form to create a new voucher</p>
            </div>
         </div>
         <div className="page-content">
            <Form className="form-voucher" onSubmit={handleSubmit}  onReset={handleReset}>
                <Form.Group className="mb-3" controlId="voucher_code">
                    <Form.Label>Voucher Code</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter voucher code" 
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="value">
                    <Form.Label>Value</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Example: 10%. Only enter the number" 
                        value={formData.value || ""}
                        name="value"
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter quantity voucher" 
                        value={formData.quantity}
                        name="quantity"
                        onChange={handleChange}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="expired_date">
                    <Form.Label>Expired Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        value={formData.expiredDate}
                        name="expiredDate"
                        onChange={handleChange}
                        required />
                </Form.Group>
                <div className="d-flex w-25 justify-content-end">
                    <button type="submit" className="btn btn-warning">Save</button>
                    <button type="reset" className="btn btn-secondary ms-2">Cancel</button>
                </div>
            </Form>
         </div>
      </div>
    );
 };
 export default FormVoucher;
