// ACTIONS
const ADD_PHOTO = 'ADD_PHOTO';
const GOT_PHOTOS = 'GOT_PHOTOS';

// CREATORS
const addPhoto = photo => ({
  type: ADD_PHOTO,
  payload: photo,
})

const gotPhotos = allPhotos => ({
  type: GOT_PHOTOS,
  payload: allPhotos,
})

// THUNKS
export const fetchInitialPhotos = () => async dispatch => {
  try {
    fetch('http://localhost:3000/photos')
      .then(res => res.json())
      .then(allPhotos => {
        dispatch(gotPhotos(allPhotos))
      })
  } catch (error) {
    console.error(error);
  }
}

export const uploadPhoto = imageFile => async dispatch => {
  try {
    /**
     * We're using the FormData api to create the body of our fetch
     * https://developer.mozilla.org/en-US/docs/Web/API/FormData
     */
    const imageData = new FormData();
    imageData.append('file', imageFile);
    imageData.append('upload_preset', 'example1'); // `example1` comes from a pre-defined upload preset on cloudinary to format the file size
    
    // you will replace this URL with your own API from cloudinary
    fetch('https://api.cloudinary.com/v1_1/calamityadam/image/upload', {
      method: 'POST',
      body: imageData,
    })
      .then(res => res.json())
      .then(res => {
        // console.log('res from cloudinary', res)
        // we have gotten a response back from cloudinary
        // now time to post that to our own database
        
        /**
         * cloudinary response contains a key of `secure_url`
         * this is the direct URL to the image that we will save to our database
         */
        
        fetch('http://localhost:3000/photos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'image_url': res.secure_url })
        })
          .then(res => res.json())
          .then(res => {
            // console.log('res from json server', res)
            // we have gotten a response from OUR server/db
            // lets add that image to state
            dispatch(addPhoto(res))
          })
      })
     
  } catch (error) {
    console.error(error)
  }
}

// HANDLERS (alternative to a switch statement in the reducer)
const handlers = {
  [ADD_PHOTO]: (state, { payload }) => ({
    ...state,
    allPhotos: [...state.allPhotos, payload]
  }),
  [GOT_PHOTOS]: (state, { payload }) => ({
    ...state,
    allPhotos: payload
  })
}

// INITIAL STATE
const initialState = {
  allPhotos: [],
}

// REDUCER
const photoReducer = (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
}

export default photoReducer
