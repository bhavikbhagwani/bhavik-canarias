import React, { useContext, useEffect } from 'react'
import './Islands.css'
import NavBar from '../home/navbar/NavBar'
import { islandsData, islandsIntro } from '../../utils/islandsData'
import Footer from '../../components/footer/Footer'
import { ScrollTop } from 'primereact/scrolltop'

const Islands = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <>
    
    <div className='islands_page_container'>
        <NavBar></NavBar>

        <div className='islands_page_content'>
            <div className='islands_container'>
                <h1>The Canary Islands</h1>
                
                <div className='islands_text_container'>
                    <p>
                        {islandsIntro}
                    </p>
                </div>

                <div className="islands_list">
                    {islandsData.map((island, index) => (
                    <div key={index} className="island_card">
                        <img src={island.image} alt={island.name} className="island_image" />
                        <div className="island_info">
                            <h2>{island.name}</h2>
                            <p>{island.description}</p>
                            <p>Airports:</p>
                            <ul className='island_airports'>
                                {island.airports.map((airport, idx) => (
                                    <li key={idx}>{airport}</li>
                                ))}
                                </ul>
                        </div>
                    </div>
                    ))}
                </div>
                

            </div>
            
        </div>

        
    </div>
    <Footer></Footer>

    <ScrollTop />
    
    </>
  )
}

export default Islands