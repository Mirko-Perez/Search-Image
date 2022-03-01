import { useState } from "react";
import { Field, Form, Formik } from "formik";


const  SearchImage= () => {

  const [photos, setPhotos] = useState([])
  const open = (url) =>{
    window.open(url)
  }

  console.log({photos})
  return (
    <div className="app">
      <header>
        <h1 className='title'>Search image</h1>
        <Formik
          initialValues={{searh:''}}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID 0wNbwVW3qenGNVSxHdpEi3n4Dnh_TBKConwDFIUit08'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}
        
        >
          <Form>
            <Field  placeholder='search...' name='search' type='text'/>
          </Form>
        </Formik>

      </header>
      <hr />

      <div className='gallery'>
          {
            photos.map((photo)=>
              <article key={photo.id}   onClick={()=>open(photo.links.html)} >
                <img src={photo.urls.regular}  alt='img' />
                {/* <p>{[photo.description,photo.alt_description].join(' - ')}</p> */}
              </article>
            )

          }
        </div>

    </div>
  );
}

export default SearchImage;
