import { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
   componentDidMount() {
      let formData = new FormData()
      formData.append('name', 'name')
      console.log(formData.get('name'))
      axios.post(`http://localhost:4000/api/users/register`, formData, {
         headers: { 'Content-type': 'multipart/form-data' }
      }).then(res => console.log(res))
   }
   render() {
      return (
         <>
            <div>
               hello world
               <br />
               <span>It's a me! Mario!</span>
            </div>
         </>
      )
   }
}
