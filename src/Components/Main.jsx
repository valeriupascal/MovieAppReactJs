import React, { useEffect, useState } from 'react'
import Card from './Card'



let base_url = 'https://api.themoviedb.org/3'
let api_key = process.env.REACT_APP_API_IMDB_KEY


let url = base_url + '/discover/movie?sort_by=popularity.desc' + api_key;

let arr = ['Popular', 'Theatre', 'Kids', 'Drama', 'Comedie']

const Main = () => {
    
    const [movieData, setMovieData] = useState([]);
    const [url_set, setUrl] = useState(url);
    const [search, setSearch] = useState('');


    // fetching the mov
    useEffect(() => {
        fetch(url_set).then(res => res.json()).then(data => {
            
            // console.log(data);
            setMovieData(data.results);
        })
    },[url_set])


    const getData = (movieType) => {
        if(movieType =='Popular') {
            url = base_url + '/discover/movie?sort_by=popularity.desc' + api_key;
        }
        if(movieType =='Theatre') {
            url = base_url + '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22' + api_key;
        }
        if(movieType == 'Kids') {
            url = base_url + '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc' + api_key;
        }
        if(movieType == 'Drama') {
            url = base_url + '/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10' + api_key;
        }
        if(movieType == 'Comedie') {
            url = base_url + '/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc' + api_key;
        }
        setUrl(url);
    }



    const searchMovie = async (evt) => {
        if(evt.key==='Enter') {
            url = await base_url + '/search/movie?api_key=' + process.env.REACT_APP_JUST_KEY_API + '&query=' + search;
            setUrl(url);
            setSearch(' ')
            console.log(url_set)
        }
    }

  return (
    <>
        <div className="header">
            <nav>
                <ul>
                    {
                        arr.map((value) => {
                            return (
                                <li>
                                    <a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}>
                                    {value}
                                    </a>
                                </li>
                            )
                        })
                    }
                    
                </ul>
            </nav>

            <form>
                <div className="search-btn">
                    <input type="text" placeholder="Enter movie name..." 
                            className="inputText" 
                            onChange={(e) => {setSearch(e.target.value)}} 
                            value={search}
                            onKeyPress={searchMovie} />
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </form>
        </div>

        <div className="container">
            {
                (movieData.length==0) ? <p className="notfound">Not Found</p> :
                movieData.map((res, pos) => {
                    return(
                        <Card info={res} key={pos} /> 
                    )
                })
            }
        </div>
    </>
  )
}

export default Main