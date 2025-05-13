import React, { useState, useEffect } from 'react';
import '../../../src/assets/css/AddEditAddress.css';
import dvhcvn from '../../json/dvhcvn.json';
import DeliveryWithGeolocation from './DeliveryWithGeolocation';

const AddEditAddress = ({ isOpen, onClose, onSave, initialData }) => {
    const [address, setAddress] = useState({
        city: '',
        district: '',
        street: '',
        detailLocation: ''
    });
    const [rawData, setRawData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [streets, setStreets] = useState([]);
    const [errors, setErrors] = useState({ city: '', district: '', street: '', detailLocation: '' });
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);

    useEffect(() => {
        setRawData(dvhcvn.data || []);
    }, []);

    useEffect(() => {
        if (initialData) {
            setAddress(initialData); // Set initial data if editing
        } else {
            setAddress({
                city: '',
                district: '',
                street: '',
                detailLocation: ''
            }); // Reset if adding new
        }
    }, [initialData]);

    useEffect(() => {
        const city = rawData.find(c => c.name === address.city);
        setDistricts(city ? city.level2s : []);
        setAddress(prev => ({ ...prev, district: '', street: '' }));
    }, [address.city, rawData]);

    useEffect(() => {
        const city = rawData.find(c => c.name === address.city);
        const district = city?.level2s.find(d => d.name === address.district);
        setStreets(district ? district.level3s.map(l3 => l3.name) : []);
        setAddress(prev => ({ ...prev, street: '' }));
    }, [address.district, rawData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleSubmit = () => {
        const newErrors = {
            city: address.city ? '' : 'Vui lòng chọn thành phố',
            district: address.district ? '' : 'Vui lòng chọn quận/huyện',
            street: address.street ? '' : 'Vui lòng chọn phường/xã',
            detailLocation: address.detailLocation ? '' : 'Vui lòng nhập địa chỉ chi tiết',
        };
        setErrors(newErrors);

        if (!Object.values(newErrors).some(err => err !== '')) {
            onSave(address); // Save the address
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <div className="modal-header-modern">
                    <h2 className="modal-title">{initialData ? 'Sửa địa chỉ' : 'Thêm địa chỉ'}</h2>
                </div>
                <div className="modal-body">
                    <label>Thành phố:</label>
                    <select
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn thành phố --</option>
                        {rawData.map((city) => (
                            <option key={city.level1_id} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                    {errors.city && <p className="error-message">{errors.city}</p>}

                    <label>Quận/Huyện:</label>
                    <select
                        name="district"
                        value={address.district}
                        onChange={handleChange}
                        disabled={!districts.length}
                    >
                        <option value="">-- Chọn quận/huyện --</option>
                        {districts.map((district) => (
                            <option key={district.level2_id} value={district.name}>{district.name}</option>
                        ))}
                    </select>
                    {errors.district && <p className="error-message">{errors.district}</p>}

                    <label>Phường/Xã:</label>
                    <select
                        name="street"
                        value={address.street}
                        onChange={handleChange}
                        disabled={!streets.length}
                    >
                        <option value="">-- Chọn phường/xã --</option>
                        {streets.map((street, index) => (
                            <option key={index} value={street}>{street}</option>
                        ))}
                    </select>
                    {errors.street && <p className="error-message">{errors.street}</p>}

                    <label>Địa chỉ chi tiết:</label>
                    <input
                        name="detailLocation"
                        type="text"
                        value={address.detailLocation}
                        onChange={handleChange}
                        placeholder="Vị trí chi tiết"
                    />
                    {errors.detailLocation && <p className="error-message">{errors.detailLocation}</p>}

                </div>
                {/* Nhập nhanh từ map */}

                <button  onClick={() => setIsMapModalOpen(true)}>
                🗺️ Nhập nhanh từ map
                </button>
                {isMapModalOpen && (
                <div className="modal-backdrop">
                    <div className="modal-container map-modal">
                    <DeliveryWithGeolocation
                        onClose={() => setIsMapModalOpen(false)}
                        onSelectAddress={(fullAddress) => {
                        setAddress(prev => ({ ...prev, detailLocation: fullAddress }));
                        setIsMapModalOpen(false);
                        }}
                    />
                    </div>
                </div>
                )}

     

                <div className="modal-actions">
                    <button className="btn confirm" onClick={handleSubmit}>💾 Lưu</button>
                    <button className="btn cancel" onClick={onClose}>❌ Hủy</button>
                </div>
            </div>
        </div>
    );
};

export default AddEditAddress;
