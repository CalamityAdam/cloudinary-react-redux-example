import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { uploadPhoto, fetchInitialPhotos } from './redux'

class App extends React.Component {
  state = {
    imageToUpload: {},
  }
  
  componentDidMount() {
    this.props.fetchPhotos()
  }
  
  handleChange = (event) => {
    event.preventDefault();
    const files = event.target.files;
    // image is at event.target.files[0]
    // because multiple files can be uploaded, files is an array. we want the first one.
    this.setState({imageToUpload: files[0]})
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postPhoto(this.state.imageToUpload)
  }
  
  render() {
    return (
      <div className="App">
        <p>hello from app.js</p>
        <form onSubmit={this.handleSubmit} >
          <label htmlFor="file">Image</label>
          <input 
            type="file"
            id="file"
            placeholder="Upload an image"
            onChange={this.handleChange}
          />
          <button type="submit">
            Upload
          </button>
          <br/>
          {this.props.allPhotos.map(photo => (
            <img src={photo.image_url} key={photo.id} style={{width: "75%"}} alt=''/>
          ))}
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  allPhotos: state.photo.allPhotos,
})

const mapDispatch = dispatch => ({
  fetchPhotos: () => dispatch(fetchInitialPhotos()),
  postPhoto: photo => dispatch(uploadPhoto(photo)),
})

export default connect(mapState, mapDispatch)(App);
