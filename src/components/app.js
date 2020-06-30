import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      file: {}
    }

    this.handleChange=this.handleChange.bind(this)
    this.handleDownload=this.handleDownload.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleGetData=this.handleGetData.bind(this)
  }
  
  handleChange(event) {
    this.setState({file: event.target.files[0] })
  }

  handleDownload() {
    const url = window.URL.createObjectURL(this.state.file)
    const link = document.createElement("a")
    link.download = this.state.file.name
    link.href = url
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }


  handleSubmit() {
    const form = new FormData()
    form.append("name", this.state.file.name)
    form.append("type", this.state.file.type)
    form.append("data", this.state.file)

    fetch("http://127.0.0.1:5000/file/add", {
      method: "POST",
      body: form
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  handleGetData() {
  fetch("http://127.0.0.1:5000/file/get/1", { method: "GET" }
  .then(response => response.blob()))
  .then(data => {
    const file = new File([data], "Test.jpg", { type: "image/jpeg" })
    this.setState({ file: file })
  })
  .catch(error => console.log(error))
  }

  render() {
  return (
    <div className='app'>
      <input onChange={this.handleChange} type="file"/>
      <input onChange={this.handleChange} type="file"/>
        <button onClick={this.handleSubmit}>Send</button>
        <hr/>
        <button onClick={this.handleGetData}>Get File</button>
        <button onClick={this.handleDownload}>Download</button>
      </div>
    );
  }
}
