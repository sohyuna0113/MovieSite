import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from './Sections/MainImage'
import axios from 'axios'
import GridCards from '../commons/GridCards'
import { Row } from 'antd'

function LandingPage() {
    
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0)

    /* API_URL과 api_key는 Config에서 상수처리를 해둠 */

    /* MainImage.js의 props를 통해서 이미 정보를 가져올 수 있다. */
    useEffect(() => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)

    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
                .then(response => response.json())
                .then(response => {
                    console.log(response.results)
                    setMovies([...Movies, ...response.results])
                    setMainMovieImage(response.results[0])
                    setCurrentPage(response.page)
                })
    }
    
    const loadMoreItems = () => {
        
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
        
    }



    return (
        <div style={{ width: '100%', margin: '0' }}>

            { /* Main Image */ }
            {MainMovieImage && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }
            <div stype={{ width: '85%', margin: '1rem auto'}}>
                <h2> Movies by latetest</h2>
                <hr />
                {/* Movie Grid Cards */} 
                <Row gutter={[16, 16]}>
                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <GridCards 
                            landingPage
                            image={movie.poster_path ?
                                `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movidName={movie.original_title}
                        />
                    </React.Fragment>
                ))}

                </Row>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>

        </div>
    )
}

export default LandingPage
