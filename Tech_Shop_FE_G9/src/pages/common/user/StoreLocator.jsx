import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Sửa lỗi icon Leaflet không hiện
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
  { id: 1, name: 'Iuh Store - 218-220 Trần Quang Khải, Q.1', address: 'Chuyên Laptop, Điện thoại chính hãng', time: '8h00 - 22h00 (Tất cả các ngày)', phone: '02871000218', position: { lat: 10.790859, lng: 106.695602 } },
  { id: 2, name: 'Iuh Store - 55B Trần Quang Khải, Q.1', address: 'Điện thoại, Tablet, Phụ kiện', time: '8h00 - 22h00 (Tất cả các ngày)', phone: '02871083355', position: { lat: 10.791253, lng: 106.696222 } },
  { id: 3, name: 'Iuh Store - 114 Phan Đăng Lưu, Q. Phú Nhuận', address: 'Laptop Gaming, Văn phòng', time: '8h00 - 22h00 (Tất cả các ngày)', phone: '02871000219', position: { lat: 10.8030578, lng: 106.6839003 } },
  { id: 4, name: 'Iuh Store - 159 Nguyễn Thị Minh Khai, Q.1', address: 'Điện thoại cao cấp, iPhone, Samsung', time: '8h00 - 22h00 (Tất cả các ngày)', phone: '02871066159', position: { lat: 10.7707171, lng: 106.6868234 } },
  { id: 5, name: 'Iuh Store - 191 Nguyễn Sơn, Phú Thạnh, Tân Bình', address: 'Chi nhánh Gò Vấp - Laptop & Mobile', time: '8h00 - 21h00 (Thứ 2 - Chủ nhật)', phone: '02838940390', position: { lat: 10.781547673821299, lng: 106.6308422629703 } },
  { id: 6, name: 'Iuh Store - 01 Võ Văn Ngân, Thủ Đức', address: 'Điện thoại, Laptop học sinh sinh viên', time: '8h30 - 21h30 (Tất cả các ngày)', phone: '02838940391', position: { lat: 10.81093, lng: 106.859992 } },
  { id: 7, name: 'Iuh Store - 50 Lê Văn Việt, Q.9', address: 'Laptop, Tablet & Dịch vụ kỹ thuật', time: '9h00 - 21h00 (Tất cả các ngày)', phone: '02871088999', position: { lat: 10.8423, lng: 106.7875 } },
  { id: 8, name: 'Iuh Store - 234 Nguyễn Văn Cừ, Q.5', address: 'Chuyên iPhone, iPad, MacBook', time: '8h00 - 22h00 (Tất cả các ngày)', phone: '02871088234', position: { lat: 10.7556, lng: 106.6797 } },
];

const MapController = ({ selectedStore }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedStore) {
      map.setView([selectedStore.position.lat, selectedStore.position.lng], 14);
    }
  }, [selectedStore, map]);
  return null;
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const StoreLocator = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestStore, setNearestStore] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        let minDist = Infinity;
        let closest = null;
        for (const store of storeLocations) {
          const dist = calculateDistance(latitude, longitude, store.position.lat, store.position.lng);
          if (dist < minDist) {
            minDist = dist;
            closest = store;
          }
        }
        setNearestStore({ ...closest, distance: minDist.toFixed(2) });
        setSelectedStore(closest);
      });
    } else {
      alert('Trình duyệt không hỗ trợ định vị vị trí.');
    }
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ width: '35%', padding: '20px', overflowY: 'auto', maxHeight: '720px' }}>
        <h3>Vui lòng chọn hệ thống cửa hàng</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button style={{ padding: '5px 10px', backgroundColor: '#00acc1', color: 'white' }}>TeamIUH</button>
          <button style={{ padding: '5px 10px' }}>TeamIuh</button>
        </div>
        <input
          type="text"
          placeholder="Nhập vị trí để tìm cửa hàng gần nhất"
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        {userLocation && nearestStore ? (
          <p>
            🧭 Gần bạn nhất là: <strong>{nearestStore.name}</strong> ({nearestStore.distance} km)
          </p>
        ) : (
          <p>📍 Đang xác định vị trí hiện tại của bạn...</p>
        )}
        <p><strong>Có {storeLocations.length}</strong> cửa hàng trong hệ thống</p>

        <div>
          {storeLocations.map((store) => (
            <div
              key={store.id}
              onClick={() => setSelectedStore(store)}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '6px',
                backgroundColor: selectedStore?.id === store.id ? '#e0f7fa' : '#fff',
                cursor: 'pointer',
              }}
            >
              <h4>{store.name}</h4>
              {store.address && <p>{store.address}</p>}
              <p>{store.time}</p>
              <p>📞 {store.phone}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>Bạn đang ở đây 📍</Popup>
            </Marker>
          )}
          {storeLocations.map((store) => (
            <Marker
              key={store.id}
              position={[store.position.lat, store.position.lng]}
              eventHandlers={{ click: () => setSelectedStore(store) }}
            >
              {selectedStore?.id === store.id && (
                <Popup>
                  <div>
                    <h4>{store.name}</h4>
                    <p>{store.address}</p>
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
