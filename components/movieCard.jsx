import React from 'react'
import { Card } from 'react-bootstrap'
import { useRouter } from "next/router";

const MovieCard = ({ movieDetails }) => {
    const router = useRouter();

    const onButtonClick = () => {
        router.push(`movie-details?ImdbID=${movieDetails.imdbID}`)
    };

    return (
        <>
            {movieDetails ?
                <Card className='movie-card bg-dark text-white' style={{ maxWidth: "90%", height: "100%", cursor: "pointer" }} onClick={onButtonClick}>
                    <Card.Img src={movieDetails.Poster} alt="not avalable" style={{ maxWidth: "100%", height: "280px" }} />
                    <Card.Body>{movieDetails.Title} ({movieDetails.Year})</Card.Body>
                </Card>
                :
                null
            }
        </>
    )
};

export default MovieCard;