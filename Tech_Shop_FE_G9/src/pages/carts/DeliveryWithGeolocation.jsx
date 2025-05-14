import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../assets/css/DeliveryWithGeolocation.css";

export default function DeliveryWithGeolocation({ onClose, onSelectAddress }) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [manualAddress, setManualAddress] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null);

  const storePosition = { lat: 10.8222031, lng: 106.6867649 };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateDeliveryTime = (coords) => {
    if (coords && storePosition) {
      const distance = calculateDistance(
        storePosition.lat,
        storePosition.lng,
        coords.lat,
        coords.lng
      );
      const speed = 30;
      const dailyDriveTime = 5;
      const prepTime = 1;
      const travelTimeInHours = distance / speed;
      const travelDays = Math.ceil(travelTimeInHours / dailyDriveTime);
      const totalTimeInDays = prepTime + travelDays;
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
      calculateDeliveryTime(coords);
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
        calculateDeliveryTime(coords);
      },
      async () => {
        alert("Không thể truy cập vị trí! Dùng vị trí cửa hàng mặc định.");
        const fallback = storePosition;
        setSelectedPosition(fallback);
        setSelectedAddress(await fetchAddress(fallback));
        initMap(fallback);
        calculateDeliveryTime(fallback);
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
      calculateDeliveryTime(newCoords);
    });

    map.on("moveend", async () => {
      const newCenter = map.getCenter();
      const newCoords = { lat: newCenter.lat, lng: newCenter.lng };
      marker.setLatLng(newCoords);
      setSelectedPosition(newCoords);
      const newAddress = await fetchAddress(newCoords);
      setSelectedAddress(newAddress);
      calculateDeliveryTime(newCoords);
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="Delivery-With-Geolocation__">
      <div className="header">
        <h3>Thiết lập địa chỉ giao hàng</h3>
      </div>

      <div className="scrollable-content">
        <div ref={mapContainerRef} className="map-container"></div>

        <div>
          <label onClick={() => setIsInputVisible(true)} className="clickable-label">
            Nhập địa chỉ giao hàng:
          </label>

          {isInputVisible && (
            <div className="manual-address-input">
              <input
                type="text"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                placeholder="VD: 12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, TP.HCM"
              />
              <button onClick={handleManualAddressSubmit}>Xác nhận địa chỉ</button>
            </div>
          )}
        </div>

        <div className="delivery-info">
          <p><strong>Địa chỉ giao hàng của bạn:</strong><br />{selectedAddress}</p>
          <p><strong>Thời gian giao hàng dự kiến:</strong> {estimatedDeliveryTime}</p>
        </div>
      </div>

      <div className="actions">
        <button className="btn confirm" onClick={() => onSelectAddress(selectedAddress)}>Xác nhận</button>
        <button className="btn cancel" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}
