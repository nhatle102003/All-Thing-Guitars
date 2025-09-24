import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;


const GuitarList = () => {
  const [guitars, setGuitars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSpecifiedGuitarsQuery] = useState("");

  const handleSearch = ()=>{
    fetch(`${API_URL}guitars/${searchQuery}`)
     .then((res) => res.json())
     .then((data) => setGuitars(data))
     .catch((err) => console.error("Search error:", err));
  };

  useEffect(() => {
    fetch(`${API_URL}guitars`)
      .then((res) => res.json())
      .then((data) => {
        setGuitars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch guitars:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading guitars...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Guitars</h2>
      <div className="search-container" >
        <input
          type="text"
          placeholder="Search by Make (e.g. PRS) or by the specific product"
          value={searchQuery}
          onChange={(e) =>setSpecifiedGuitarsQuery(e.target.value)}
          onKeyDown={(e) => {
          if (e.key === 'Enter') {
              handleSearch();
            }}
          }
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {guitars.map((guitar) => (
          <div
            key={guitar.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <img
              src={`/guitar-images/${guitar.MAKE}/${guitar.DISPLAY}`}
              alt={guitar.NAME}
              style={{ maxWidth: "100%", height: "auto", marginBottom: "0.5rem" }}
            />
            <h3>{guitar.NAME}</h3>
            <p><strong>Make:</strong> {guitar.MAKE}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuitarList;