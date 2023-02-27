import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from '../components/movieCard'
import { Row, Col, Container, Form, Card, Button, InputGroup, Spinner, Pagination } from "react-bootstrap"

let page = 1;
let type = "";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [isSeries, setIsisSeries] = useState(false);
  const [isMovies, setIsMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAllMovies, setIsAllMovies] = useState(true);
  const [isSpinner, setIsSpinner] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      let resp = await axios.get(`https://www.omdbapi.com/?apikey=${"7a9e765e"}&s=${movieName ? movieName : "2022"}&page=${page}&type=${type}`);
      if (resp.data.Response === "True") {
        if (page > 1) {
          setMovies([...movies, ...resp.data.Search]);
          setIsSpinner(false);
        } else {
          setMovies([]);
          setMovies(resp.data.Search);
        }
        setIsLoading(false);
      } else {
        setMovies([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onSearchHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMovies([]);
    getMovies();
  };

  const getMoreMovies = () => {
    page += 1;
    setIsSpinner(true);
    getMovies();
  };

  const onAllClick = () => {
    type = "";
    setIsLoading(true);
    getMovies();
    setIsAllMovies(true);
    setIsisSeries(false);
    setIsMovies(false);
  };

  const onSeriesClick = () => {
    type = "series";
    setIsLoading(true);
    getMovies();
    setIsisSeries(true);
    setIsAllMovies(false);
    setIsMovies(false);
  };

  const onMoviesClick = () => {
    type = "movie";
    setIsLoading(true);
    getMovies();
    setIsMovies(true);
    setIsAllMovies(false);
    setIsisSeries(false);
  };

  if (isLoading) {
    return (
      <div className='vw-100 vh-100 d-flex justify-content-center align-items-center'>
        <Spinner animation='border' variant="light" />
      </div>
    )
  };

  return (
    <>
      <Head>
        <title>Movies App</title>
        <meta name="description" content="Movies app created by naim" />
        <link rel="icon" href="/film.svg" />
      </Head>

      <main>
        <Container>
          <Row className='mb-3 mt-3'>
            <Col md={4}>

            </Col>
          </Row>
        </Container>
        <Container className='mb-3'>
          <Row>
            <Col md={2}>
              <Card className={[" movie-card mb-2", isAllMovies ? "bg-danger" : "bg-dark",].join(" ")}
                onClick={onAllClick}
                style={{ cursor: "pointer" }}>
                <Card.Body className="p-1 text-center text-white">
                  All
                </Card.Body>
              </Card>
            </Col>
            <Col md={2}>
              <Card className={[" movie-card mb-2", isSeries ? "bg-danger" : "bg-dark",].join(" ")}
                onClick={onSeriesClick}
                style={{ cursor: "pointer" }}>
                <Card.Body className="p-1 text-center text-white">
                  series
                </Card.Body>
              </Card>
            </Col>
            <Col md={2}>
              <Card className={[' movie-card mb-2', isMovies ? "bg-danger" : "bg-dark"].join(" ")}
                onClick={onMoviesClick}
                style={{ cursor: "pointer" }}>
                <Card.Body className='p-1 text-center text-white'>
                  movie
                </Card.Body>
              </Card>
            </Col>
            <Col md={2}></Col>
            <Col md={4}>
              <InputGroup >
                <Form.Control
                  className='bg-dark border-dark text-white'
                  placeholder='Search movies'
                  type='text'
                  value={movieName}
                  onChange={(e) => setMovieName(e.target.value)}
                />
                <InputGroup.Text className='bg-dark border-dark text-white' style={{ cursor: "pointer" }} onClick={onSearchHandler}>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </Container>
        <Container className='mb-3'>
          <Card className='p-4 ps-5 border-0 bg-dark' style={{ minHeight: "100vh" }}>
            <Row>
              {
                movies.length > 0 ? movies.map((item, i) => (
                  <Col md={4} lg={3} key={i} className="mb-5">
                    <MovieCard movieDetails={item} />
                  </Col>
                ))
                  :
                  <h6 className='text-white text-center mt-4'>Not Found</h6>
              }
            </Row>
          </Card>
        </Container>
        <Container className='text-center mb-3'>
          <Button className='bg-danger border-0' onClick={getMoreMovies}>Load More {isSpinner ? <div className='spinner-border spinner-border-sm'></div> : null}</Button>
        </Container>
      </main>

      <footer className='text-white text-center'>
        Created by © Naim
      </footer>
    </>
  )
};

export default MovieList;
