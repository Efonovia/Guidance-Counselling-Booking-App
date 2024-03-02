import React from 'react';
import carPic from "../assets/img/banner.png"
import { Carousel } from 'rsuite';
import "../styles/customcarousel.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function CustomCarousel() {

    const testItems = [
      {
        name: "Chance the rapper",
        pic: carPic
      },
      {
        name: "Chance the rapper2",
        pic: carPic
      },
      {
        name: "Chance the rapper3",
        pic: carPic
      },
      {
        name: "Chance the rapper4",
        pic: carPic
      },
      {
        name: "Chance the rapper5",
        pic: carPic
      },
      {
        name: "Chance the rapper6",
        pic: carPic
      },
      {
        name: "Chance the rapper7",
        pic: carPic
      },
      {
        name: "Chance the rapper8",
        pic: carPic
      },
      {
        name: "Chance the rapper9",
        pic: carPic
      },
    ]
    const [activeIndex, setActiveIndex] = React.useState(0);

    const itemsHtml = testItems.map((item, i) => {
      return <div key={i} className='my-carousel-inner'>
              <h3>{item.name}</h3>
              <img alt="..." src={`https://via.placeholder.com/600x250/8f8e94/FFFFFF?text=${i+1}`} height="250" />
            </div>
    })

    function moveCarousel(operation) {
      if((operation === "sub" && activeIndex === 0)) {
        setActiveIndex(testItems.length-1)
        return
      }

      if(operation === "add" && activeIndex === testItems.length-1) {
        setActiveIndex(0)
        return
      }

      if(operation === "add") {
        setActiveIndex(prev => {
          console.log(prev+1)
          return prev+1
        })
      } else if(operation === "sub") {
        setActiveIndex(prev => {
          console.log(prev-1)
          return prev-1
        })
      }
    }

    return (
      <div className='overall'>
        <div className='outer'>
          <ArrowBackIosIcon onClick={() => moveCarousel("sub")} sx={{cursor: "pointer"}} />
          <Carousel
            className="custom-slider"
            activeIndex={activeIndex}
            onSelect={index => {
              setActiveIndex(index);
            }}
          >
            {itemsHtml}
          </Carousel>
          <ArrowForwardIosIcon onClick={() => moveCarousel("add")} sx={{cursor: "pointer"}} />
        </div>

        <div className='next-btn'>Select & Proceed</div>
      </div>
    );
}


export default CustomCarousel