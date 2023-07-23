import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, descrption,imageurl,newsurl,author,date,source} = this.props;
    return (
      
      <div className='my-3'>
         
         <div className="card" >
            <img src={imageurl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <span class="badge text-bg-danger my-3">{source}</span>
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{descrption}...</p>
                

                <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {date}</small></p>
                <div style={{position : "relative",left : "70%"}}>
                <a rel="noreferrer" href={newsurl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                </div>
                
            </div>
        </div>
      </div>
    )
  }
}
// style={{width : "18rem"}}
export default NewsItem
