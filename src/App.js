import React, { Component } from 'react'
import axios from 'axios'
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      code:[],
      repo_data:[]
    }
  }
   async componentDidMount(){
    await axios
    .get("https://api.github.com/repos/nlok5923/love-babbar-450/contents")
    .then(async (res)=>{
       console.log(res)
      await this.setState({code : res.data})
    })
    .catch((err)=>console.log(err))
   this.state.code.map(async (data,index)=>{
     await axios
     .get(data._links.self)
     .then(async (res)=>{      
      this.setState(prevState =>({
       repo_data:[...prevState.repo_data , res] 
      }))
      console.log(this.state.repo_data)
     })
   })
   console.log(this.state.repo_data)

  }
render()  {
  const {code , repo_data} = this.state;
    return (
      <div>
      <h1 className="text-center">Question's by Babbar bhaiya</h1>
      <div className="container ">
        {
          repo_data.map((data)=>{
            
            return (<ul>
            <h3 className="text-center">{data.data.name}</h3>
              <li><pre className="code"><code>{atob(data.data.content)}</code></pre></li>
              </ul>
              )
            
            })
        }
      </div>
      </div>
    )
  }
}

export default App
