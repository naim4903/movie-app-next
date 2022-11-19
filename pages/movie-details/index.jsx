import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Card, Spinner } from "react-bootstrap"
import { useRouter } from 'next/router'
import Link from 'next/link'
import StarsRating from 'stars-rating'

const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (router.query.ImdbID) {
            setLoading(true);
            getMovieDetails(router.query.ImdbID);
        } else {
            return
        }
    }, []);

    const getMovieDetails = async (id) => {
        try {
            let resp = await axios.get(`https://www.omdbapi.com/?apikey=${"7a9e765e"}&i=${id}`);
            if (resp.data) {
                setLoading(false);
                setMovieDetails(resp.data);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='vw-100 vh-100 d-flex justify-content-center align-items-center'>
                <Spinner animation='border' variant="light" />
            </div>
        )
    };

    return (
        <Container className='mt-5'>
            <Card className='bg-dark text-white'>
                <Row>
                    <Col md={4}>
                        <Card.Img src={movieDetails.Poster} />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <ul className='fs-5 pt-3' style={{ listStyle: "none", lineHeight: "2.1rem" }}>
                                <li><span className='text-muted'>Title</span> : {movieDetails.Title}</li>
                                <li><span className='text-muted'>Actors</span> : {movieDetails.Actors}</li>
                                <li><span className='text-muted'>Genre</span> : {movieDetails.Genre}</li>
                                <li><span className='text-muted'>Plot</span> : {movieDetails.Plot}</li>
                                <li><span className='text-muted'>Director</span> : {movieDetails.Director}</li>
                                <li><span className='text-muted'>Writer</span> : {movieDetails.Writer}</li>
                                <li><span className='text-muted'>Released</span> : {movieDetails.Released}</li>
                                <li className='mb-2'> <StarsRating count={5} edit={false} value={parseInt(movieDetails.imdbRating)} size={26} /></li>
                                <Link href={"/"}>
                                    <li>
                                        <Button className='btn-light fs-6' size='sm'><i className="bi bi-arrow-left-circle-fill"></i> Go Back</Button>
                                    </li>
                                </Link>
                            </ul>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}

export default MovieDetails;