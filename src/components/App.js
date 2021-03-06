import React from 'react';
import Navbar from './Navbar'
import MovieCard from './MovieCard'
import { data } from '../data'
import { addMovies, setShowFavourites } from '../action';
import {StoreContext} from '../index'
class App extends React.Component {
  componentDidMount(){
      const {store}=this.props;
      store.subscribe(()=>{
        console.log('updated');
        this.forceUpdate();
      })
    store.dispatch(addMovies(data));
    console.log(this.props.store.getState());
  }

  isMovieFavourite = (movie)=>{
    const {movies}=this.props.store.getState();
    const index=movies.favourites.indexOf(movie);
    if(index !== -1){
      //movie founded
      return true;
    }
    return false;
  }
  onChangeTab = (val) =>{
    this.props.store.dispatch(setShowFavourites(val));
  }
  render (){
    const {movies, search}=this.props.store.getState(); //  {movies:{},search:{}}
    const {list,favourites=[],showFavourites=[]}=movies;  
    console.log(this.props.store.getState());
    const displayMovies=showFavourites ? favourites : list;
    
    return (
          <div className="App">
          <Navbar  search={search}/>
            <div className="main">
              <div className="tabs">
                <div className={`tab ${showFavourites ? '' :'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
                <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
              </div>
              <div className="list">
                {displayMovies.map((movie,index)=>(
                  <MovieCard 
                    movie={movie} 
                    key={`movie-${index}`} 
                    dispatch={this.props.store.dispatch}
                    isFavourite={this.isMovieFavourite(movie)}
                  />
                ))}
                {displayMovies.length === 0 ? <div> Add movies to favourite list</div> : null}
              </div>
            </div>
        </div>
    )
   
  }
}
class AppWrapper extends React.Component{
  render() {
    return (
       <StoreContext.Consumer>
         {(store)=> <App store={store}/>}
       </StoreContext.Consumer>
    );
  }
}
export default AppWrapper;
