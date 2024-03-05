import React from 'react';
import { Carousel } from 'rsuite';
import "../styles/customcarousel.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { httpGetAllCounselors } from '../requests.hooks';
import { CircularProgress } from '@mui/material';


function CustomCarousel(props) {

    const [activeIndex, setActiveIndex] = React.useState(0);
    const [listOfCounselors, setListOfCounselors] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
      const fetchData = async () => {
          try {
              const result = await httpGetAllCounselors();
              setListOfCounselors(result);
          } catch (error) {
              console.error('Error fetching appointment:', error);
          } finally {
              setLoading(false)
          }
      };

      fetchData();
      
    }, [])  

    const itemsHtml = listOfCounselors.map((counselor, i) => {
      return <div key={i} className='my-carousel-inner'>
              <h3 style={{position: "absolute", textShadow: "2px 2px black"}}>{counselor.firstName} {counselor.lastName}</h3>
              <img alt="..." src={`http://localhost:8000/counselors/pic/${counselor.picturePath}`} style={{height:"100%"}} />
            </div>
    })

    function moveCarousel(operation) {
      if((operation === "sub" && activeIndex === 0)) {
        setActiveIndex(listOfCounselors.length-1)
        return
      }

      if(operation === "add" && activeIndex === listOfCounselors.length-1) {
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

    function handleSelect() {
      props.setCounselor(listOfCounselors[activeIndex]._id)
      props.scrollToAppointmentForm()
    }

    return ( loading ? <CircularProgress size={100} sx={{color:'black', margin: "150px 400px"}}/> : 
      <div className='overall'>
        <h2 style={{color: "black", marginBottom: "-40px"}}>Select a Counselor</h2>
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

        <div onClick={handleSelect} className='next-btn'>Select & Proceed</div>
      </div>
    );
}


export default CustomCarousel