import React, { useState, useEffect } from 'react';
import MediaCard from '../MediaCardComponent/MediaCard';
import { Grid } from '@material-ui/core';
import './MediaGrid.css';




const api_key = process.env.REACT_APP_API_KEY;
interface IState {
    title: string;
    poster_path: string;
}
interface IMediaGridProps {
    SearchQuery: (string | null);

}
function MediaGrid(props: IMediaGridProps) {
    const [ItemArray, setItemArray] = useState<IState[]>([{poster_path: "", title: ""}]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/search/movie?api_key='+ api_key + '&query='+ props.SearchQuery)
            .then(data => data.json())
            .then(data => {
                setItemArray(data.results)
                console.log(data)
                console.log(data.results)
               
            })
            .catch(() => console.log("it didn't work")
            );

    }, [props.SearchQuery]);

  

    var Cards: JSX.Element[] = [];
    ItemArray.forEach((el: IState) => {
        if (el.poster_path === "") {
            //console.log(el.title);
            console.log(el['title'])
            return;
        }
       
        Cards.push(
            <Grid key={"card_"} item sm={6} md={4} lg={3} className="MediaGridCard">
                <MediaCard ImageUrl={el.poster_path} Title={el.title} />
            </Grid>)
    })
    

    return (
        <div>
            <Grid container spacing={3} className="MediaGridContainer">
                {Cards}
            </Grid>
        </div>
    )
}

export default MediaGrid