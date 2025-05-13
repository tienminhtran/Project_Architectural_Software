import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function DeliveryWithGeolocation({ onClose, onSelectAddress }) {
  const [isInputVisible, setIsInputVisible] = useState(false); // Trạng thái hiển thị ô nhập liệu
  const [manualAddress, setManualAddress] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null);

  const storePosition = { lat: 10.8222031, lng: 106.6867649 }; // Vị trí cửa hàng IUH

  // Hàm tính khoảng cách theo công thức Haversine (km)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Bán kính trái đất (km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Khoảng cách (km)
  };

  // Hàm tính toán thời gian giao hàng
  const calculateDeliveryTime = (coords) => {
    if (coords && storePosition) {
      const distance = calculateDistance(storePosition.lat, storePosition.lng, coords.lat, coords.lng);
      const speed = 30; // Tốc độ di chuyển (km/h)
      const dailyDriveTime = 5; // Thời gian chạy mỗi ngày (giờ)
      const prepTime = 1; // Thời gian chuẩn bị (ngày)

      const travelTimeInHours = distance / speed; // Tổng thời gian di chuyển (giờ)
      const travelDays = Math.ceil(travelTimeInHours / dailyDriveTime); // Tính số ngày di chuyển

      const totalTimeInDays = prepTime + travelDays; // Tổng thời gian (ngày)

      setEstimatedDeliveryTime(`${totalTimeInDays} ngày`);
    }
  };

  const fetchAddress = async ({ lat, lng }) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await res.json();
    return data.display_name || "Không xác định";
  };

  const handleManualAddressSubmit = async () => {
    if (!manualAddress.trim()) return;
    const coords = await fetchCoordinatesFromAddress(manualAddress);
    if (coords) {
      setSelectedPosition(coords);
      const resolvedAddress = await fetchAddress(coords);
      setSelectedAddress(resolvedAddress);

      if (mapRef.current && markerRef.current) {
        mapRef.current.setView(coords, 15);
        markerRef.current.setLatLng(coords);
      }
      calculateDeliveryTime(coords); // Tính toán thời gian giao hàng
    } else {
      alert("Không tìm thấy địa chỉ. Vui lòng thử lại.");
    }
  };

  const fetchCoordinatesFromAddress = async (address) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );
    const data = await res.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    }
    return null;
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = { lat: latitude, lng: longitude };
        setSelectedPosition(coords);
        const address = await fetchAddress(coords);
        setSelectedAddress(address);
        initMap(coords);
        calculateDeliveryTime(coords); // Tính toán thời gian giao hàng
      },
      async (err) => {
        alert("Không thể truy cập vị trí! Dùng vị trí cửa hàng mặc định.");
        const fallback = storePosition;
        setSelectedPosition(fallback);
        setSelectedAddress(await fetchAddress(fallback));
        initMap(fallback);
        calculateDeliveryTime(fallback); // Tính toán thời gian giao hàng
      }
    );
  };

  const initMap = (center) => {
    if (mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(center, 15);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    const marker = L.marker(center, { draggable: true }).addTo(map);
    markerRef.current = marker;

    marker.on("moveend", async () => {
      const newCoords = marker.getLatLng();
      setSelectedPosition(newCoords);

      const newAddress = await fetchAddress(newCoords);
      setSelectedAddress(newAddress);
      calculateDeliveryTime(newCoords); // Tính toán thời gian giao hàng
    });

    map.on("moveend", async () => {
      const newCenter = map.getCenter();
      const newCoords = { lat: newCenter.lat, lng: newCenter.lng };
      marker.setLatLng(newCoords);
      setSelectedPosition(newCoords);
      const newAddress = await fetchAddress(newCoords);
      setSelectedAddress(newAddress);
      calculateDeliveryTime(newCoords); // Tính toán thời gian giao hàng
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div>
      <h3>Giao hàng theo vị trí địa lý</h3>
      <div
        ref={mapContainerRef}
        style={{
          height: "300px",
          width: "100%",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      ></div>

      {/* Hiển thị label, khi nhấn vào sẽ hiện ô nhập */}
      <div>
        <label
          onClick={() => setIsInputVisible(true)} // Hiển thị ô nhập khi nhấn vào label
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "#007bff",
          }}
        >
          Nhập địa chỉ giao hàng:
        </label>
        {isInputVisible && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              placeholder="VD: 12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, TP.HCM"
            />
            <button
              onClick={handleManualAddressSubmit}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Xác nhận địa chỉ
            </button>
            
          </div>
        )}
      </div>
      <div>
        <p><strong>Địa chỉ giao hàng:</strong><br />{selectedAddress}</p>
        {/* <p><strong>Tọa độ giao hàng:</strong> {selectedPosition?.lat.toFixed(6)}, {selectedPosition?.lng.toFixed(6)}</p> */}
        <p><strong>Thời gian giao hàng dự kiến:</strong> {estimatedDeliveryTime}</p>
      </div>
      <button className="btn confirm" onClick={() => onSelectAddress(selectedAddress)}>
        Dùng địa chỉ này
      </button>
      <button className="btn cancel" onClick={onClose}>
        Đóng
      </button>

    </div>
  );
}
