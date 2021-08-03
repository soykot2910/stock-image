import React, { useState, useEffect } from "react";
import axios from "axios";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const Photos = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      const { data } = await axios.get(url);
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = (e) => {
    setQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <>
      <div className="search-section">
        <img
          src="https://source.unsplash.com/random"
          className="random-img"
          alt="random"
        />
        <form className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-input"
            placeholder="Search  photos"
          />
          <button type="submit" onClick={handleSubmit}>
            <i class="fas fa-search icon"></i>
          </button>
          <button onClick={handleClear}>
            <i className={`${query ? "fas fa-times icon clear-icon" : ""}`}></i>
          </button>
        </form>
      </div>
      <div className="gallery-wrapper">
        <div className="gallery">
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </div>
    </>
  );
};

export default Photos;
