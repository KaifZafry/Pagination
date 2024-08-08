import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    console.log(data.total);
    if (data && data.products) {
      setData(data.products);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // The fetchData function will be called only once when the component mounts.

  const selectpageHandler = (selectedPage) => {
    if (selectedPage < 1 || selectedPage > Math.ceil(data.length / 10)) return;
    setPage(selectedPage);
  };
  return (
    <div>
      {data.length > 0 && (
        <div className="products">
          {data.slice(page * 10 - 10, page * 10).map((product, index) => (
            <div className="single__product" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h2>{product.title}</h2>
            </div>
          ))}
        </div>
      )}
      {/* this is the another method  */}
      {/* {
    data.length>0 && <div className='pagination'>
      <span>◀</span>
      {Array.from({length: Math.ceil(data.length / 10)}, (_, i) => i + 1).map(number => (
        <button key={number} onClick={() => setPage(number)}>{number}</button>
      ))}
      <span>▶</span>
    </div>
  } */}

      {/* this is another method to do the same thing */}

      {data.length > 0 && (
        <div className="pagination">
          <span className={page> 1?"": "disable"} onClick={() => selectpageHandler(page - 1)}>◀</span>
          {[...Array(data.length / 10)].map((_, i) => {
            return (
              <span
                className={page == i + 1 ? "selected_page" : ""}
                onClick={() => selectpageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span className={page< data.length/10?"": "disable"} onClick={() => selectpageHandler(page + 1)}>▶</span>
        </div>
      )}
    </div>
  );
};

export default App;
