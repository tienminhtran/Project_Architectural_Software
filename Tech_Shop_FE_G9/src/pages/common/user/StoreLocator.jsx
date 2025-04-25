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
    name: 'CellphoneS 218-220 Trần Quang Khải, Phường Tân Định, Quận 1',
    address: 'Trung tâm Laptop - Gia dụng',
    time: '8h00 - 22h00 (tất cả các ngày trong tuần)',
    phone: '02871000218',
    position: { lat: 10.790859, lng: 106.695602 },
  },
  {
    id: 2,
    name: 'CellphoneS 55B Trần Quang Khải, P. Tân Định, Q. 1',
    address: '',
    time: '8h00 - 22h00 (tất cả các ngày trong tuần)',
    phone: '02871083355',
    position: { lat: 10.791253, lng: 106.696222 },
  },
  {
    id: 3,
    name: 'CellphoneS 114 Phan Đăng Lưu, P. 3, Q. Phú Nhuận',
    address: '',
    time: '8h00 - 22h00 (tất cả các ngày trong tuần)',
    phone: '02871000219',
    position: { lat: 10.803444, lng: 106.684155 },
  },
  {
    id: 4,
    name: 'CellphoneS 157-159 Nguyễn Thị Minh Khai, P. Phạm Ngũ Lão, Q.1',
    address: '',
    time: '8h00 - 22h00 (tất cả các ngày trong tuần)',
    phone: '02871066159',
    position: { lat: 10.7658, lng: 106.6925 },
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