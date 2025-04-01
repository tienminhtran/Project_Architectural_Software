import React from "react";
import FooterUser from "../components/layout/Footer"; // Adjust the path as necessary

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Welcome to the Home Page</h1>
      <p className="text-center mt-4">This is the content of the home page.</p>
      {/* Add more content here */}
      <FooterUser />
    </div>
  );
}

export default HomePage;