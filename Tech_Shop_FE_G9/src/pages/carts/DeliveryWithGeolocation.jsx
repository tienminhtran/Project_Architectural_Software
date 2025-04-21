import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function DeliveryWithGeolocation() {
  const [isInputVisible, setIsInputVisible] = useState(false); // Trạng thái hiển thị ô nhập liệu
  const [manualAddress, setManualAddress] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null);

  const storePosition = { lat: 10.8222031, lng: 106.6867649 }; // vị trí cửa hàng IUH

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
      },
      async (err) => {
        alert("Không thể truy cập vị trí! Dùng vị trí cửa hàng mặc định.");
        const fallback = storePosition;
        setSelectedPosition(fallback);
        setSelectedAddress(await fetchAddress(fallback));
        initMap(fallback);
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
    });

    map.on("moveend", async () => {
      const newCenter = map.getCenter();
      const newCoords = { lat: newCenter.lat, lng: newCenter.lng };
      marker.setLatLng(newCoords);
      setSelectedPosition(newCoords);
      const newAddress = await fetchAddress(newCoords);
      setSelectedAddress(newAddress);
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div style={{}}>
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
        <p><strong>Tọa độ giao hàng:</strong> {selectedPosition?.lat.toFixed(6)}, {selectedPosition?.lng.toFixed(6)}</p>
      </div>
    </div>
  );
}
