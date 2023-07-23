import React, { Component } from 'react'
import Growing from './Growing.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='container my-3 text-center'>
        <img src={Growing} alt="" />
      </div>
    )
  }
}
