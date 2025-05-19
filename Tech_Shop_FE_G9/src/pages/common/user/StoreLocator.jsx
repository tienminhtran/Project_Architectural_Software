import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../../assets/css/StoreLocator.css';

// Fix default marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const center = {
  lat: 10.7797838,
  lng: 106.6983851,
};

const storeLocations = [
  {
    id: 1,
    name: 'Iuh Store - 218-220 Trần Quang Khải, Q.1',
    address: 'Chuyên Laptop, Điện thoại chính hãng',
    time: '8h00 - 22h00 (Tất cả các ngày)',
    phone: '02871000218',
    position: { lat: 10.790859, lng: 106.695602 }, // Quận 1
  },
  {
    id: 2,
    name: 'Iuh Store - 55B Trần Quang Khải, Q.1',
    address: 'Điện thoại, Tablet, Phụ kiện',
    time: '8h00 - 22h00 (Tất cả các ngày)',
    phone: '02871083355',
    position: { lat: 10.791253, lng: 106.696222 }, // Gần điểm 1, vẫn Q.1
  },
  {
    id: 3,
    name: 'Iuh Store - 114 Phan Đăng Lưu, Q. Phú Nhuận',
    address: 'Laptop Gaming, Văn phòng',
    time: '8h00 - 22h00 (Tất cả các ngày)',
    phone: '02871000219',
    position: { lat: 10.803444, lng: 106.684155 }, // Phú Nhuận
  },
  {
    id: 4,
    name: 'Iuh Store - 159 Nguyễn Thị Minh Khai, Q.1',
    address: 'Điện thoại cao cấp, iPhone, Samsung',
    time: '8h00 - 22h00 (Tất cả các ngày)',
    phone: '02871066159',
    position: { lat: 10.7658, lng: 106.6925 }, // Gần trung tâm Q.1
  },
  {
    id: 5,
    name: 'Iuh Store - 12 Nguyễn Văn Bảo, Gò Vấp',
    address: 'Chi nhánh Gò Vấp - Laptop & Mobile',
    time: '8h00 - 21h00 (Thứ 2 - Chủ nhật)',
    phone: '02838940390',
    position: { lat: 10.8225, lng: 106.6840 }, // Gò Vấp
  },
  {
    id: 6,
    name: 'Iuh Store - 01 Võ Văn Ngân, Thủ Đức',
    address: 'Điện thoại, Laptop học sinh sinh viên',
    time: '8h30 - 21h30 (Tất cả các ngày)',
    phone: '02838940391',
    position: { lat: 10.8521, lng: 106.7589 }, // Thủ Đức
  },
  {
    id: 7,
    name: 'Iuh Store - 50 Lê Văn Việt, Q.9',
    address: 'Laptop, Tablet & Dịch vụ kỹ thuật',
    time: '9h00 - 21h00 (Tất cả các ngày)',
    phone: '02871088999',
    position: { lat: 10.8423, lng: 106.7875 }, // Q.9
  },
  {
    id: 8,
    name: 'Iuh Store - 234 Nguyễn Văn Cừ, Q.5',
    address: 'Chuyên iPhone, iPad, MacBook',
    time: '8h00 - 22h00 (Tất cả các ngày)',
    phone: '02871088234',
    position: { lat: 10.7556, lng: 106.6797 }, // Quận 5
  },
];


// Component to handle map panning
const MapController = ({ selectedStore }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedStore) {
      map.panTo([selectedStore.position.lat, selectedStore.position.lng]);
    }
  }, [selectedStore, map]);
  return null;
};

const StoreLocator = () => {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <div className="store-locator">
      <div className="store-locator__left">
        <h3>Vui lòng chọn hệ thống cửa hàng</h3>
        <div className="system-selector">
          <button className="active">TeamIUH</button>
          <button>TeamIuh</button>
        </div>
        <input
          type="text"
          placeholder="Nhập vị trí để tìm cửa hàng gần nhất"
          className="search-input"
        />
        <p>
          <strong>Có {storeLocations.length}</strong> cửa hàng gần vị trí hiện tại của bạn
        </p>
        <div className="store-list">
          {storeLocations.map((store) => (
            <div
              key={store.id}
              className={`store-item ${selectedStore?.id === store.id ? 'active' : ''}`}
              onClick={() => setSelectedStore(store)}
            >
              <h4>{store.name}</h4>
              {store.address && <p>{store.address}</p>}
              <p>{store.time}</p>
              <p>📞 {store.phone}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="store-locator__right">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {storeLocations.map((store) => (
            <Marker
              key={store.id}
              position={[store.position.lat, store.position.lng]}
              eventHandlers={{
                click: () => setSelectedStore(store),
              }}
            >
              {selectedStore?.id === store.id && (
                <Popup>
                  <div>
                    <h4>{store.name}</h4>
                    {store.address && <p>{store.address}</p>}
                    <p>{store.phone}</p>
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
          <MapController selectedStore={selectedStore} />
        </MapContainer>
      </div>
    </div>
  );
};

export default StoreLocator;