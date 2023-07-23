import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    
    static defaultProps ={
        country :'in',
        pageSize : 8,
        category : 'general'
    }
    static propTypes ={
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }
    constructor(){
        super();
        console.log("hello News");
        this.state = {
            articles : [],
            loading : false,
            page : 1,
            totalResults : 0
        }
    }
    async componentDidMount(){
        this.props.setProgress(10);
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be4fe4810719492684a5915d1cd893d0&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading : false
        })
        this.props.setProgress(100);
    }
    // handleNextClick = async()=>{
    //     if(this.state.page + 1 > (Math.ceil(this.state.totalResults/this.props.pageSize))){

    //     }
    //     else{
    //         let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be4fe4810719492684a5915d1cd893d0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         this.setState({loading : true})
    //         let data = await fetch(url);
    //         let parseData = await data.json();
    //         this.setState({
    //             articles: parseData.articles,
    //             page: this.state.page + 1,
    //             loading : false
    //         })
    //     }
    // }
    // handlePrevClick = async ()=>{
    //     let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be4fe4810719492684a5915d1cd893d0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading : true})
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     this.setState({
    //         articles: parseData.articles,
    //         page: this.state.page - 1,
    //         loading : false
    //     })
    // }
     fetchMoreData = async () => {
       this.setState({page : this.state.page + 1})

       let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be4fe4810719492684a5915d1cd893d0&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        this.props.setProgress(30);
        let data = await fetch(url);

        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading : false
        })
        this.props.setProgress(100);
    };
     capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  render() {
    
    return (
      <>
        <h1 className='text-center my-4' style={{position : "relative", top: "42px"}} >NewsApp Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* {
            (this.state.loading === true) &&
                <div className="text-center my-3">
                   <Spinner></Spinner>
                </div>
            
            
        } */}
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <= this.state.totalResults}
          loader={<Spinner s/>}
         >
            <div className="container my-4">

            
                <div className="row">
                    {
                        this.state.articles.map((element)=>{
                            return  element.description?<div className="col-md-4">
                            <NewsItem title = {element.title.slice(0,44)} descrption = {element.description.slice(0,88)} imageurl={element.urlToImage} newsurl={element.url} author= {element.author} date = {element.publishedAt} source={element.source.name}></NewsItem>
                            </div>:undefined
                        })
                    }
                
                    
                </div>
            </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-5">
            <button disabled = {this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled = {this.state.page + 1 > (Math.ceil(this.state.totalResults/this.props.pageSize))}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div> */}
      </>
    )
  }
}

export default News
