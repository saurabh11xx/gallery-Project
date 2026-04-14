import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=10`
      );

      setUserData(response.data);
    } catch (err) {
      setError("Failed to fetch data 😢");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [index]);

  let content;

  if (loading) {
    content = (
      <h3 className="text-gray-400 text-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </h3>
    );
  } else if (error) {
    content = (
      <h3 className="text-red-500 text-lg text-center">{error}</h3>
    );
  } else {
    content = userData.map((elem, idx) => {
      return (
        <div key={idx}>
          <a href={elem.url} target="_blank" rel="noreferrer">
            <div className="h-40 w-44 overflow-hidden rounded-xl">
              <img
                className="h-full w-full object-cover"
                src={elem.download_url}
                alt=""
              />
            </div>
            <h2 className="font-bold text-lg">{elem.author}</h2>
          </a>
        </div>
      );
    });
  }

  return (
    <div className="bg-black min-h-screen p-4 text-white relative">
      <div className="flex flex-wrap gap-4 p-2 justify-center">
        {content}
      </div>

      <div className="flex justify-center gap-6 items-center p-4">
        <button
          disabled={index === 1}
          className="bg-amber-400 disabled:opacity-50 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold"
          onClick={() => setIndex((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>

        <span className="text-lg font-bold">Page {index}</span>

        <button
          className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold"
          onClick={() => setIndex((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;