import React from 'react'

function Fund() {
  const items = [
    { id: 1, image: "image1.jpg", description: "This is the first image" },
    { id: 2, image: "image2.jpg", description: "This is the second image" },
    { id: 3, image: "image3.jpg", description: "This is the third image" }
  ]

  return (
    <> 
      <div className="container">
        <img src="big-image.jpg" alt="Big image" className="big-image" />
        <p className="description">This is a description of the big image</p>
      </div>
      <Carousel>
        {items.map(item => (
          <div key={item.id} className="item">
            <img src={item.image} alt={item.description} className="small-image" />
            <p className="description">{item.description}</p>
          </div>
        ))}
      </Carousel>  
    </>
  );
}

export default Fund;
