import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ServiceTypeCard from './ServiceTypeCard';


export default function ServiceTypes() {

    const [types, setTypes] = useState([
        {
            id: 1,
            type: 'Web Development',
            description: 'Custom web apps using the latest frameworks and technologies.'
        },
        {
            id: 2,
            type: 'AI Services',
            description: 'Machine learning, computer vision, and natural language processing.'
        },
        {
            id: 3,
            type: 'Cloud Services',
            description: 'Cloud infrastructure, DevOps, and cloud security.'
        },
        {
            id: 4,
            type: 'Mobile Development',
            description: 'iOS and Android apps using React Native.'
        },
        {
            id: 5,
            type: 'Blockchain Services',
            description: 'Smart contracts, dApps, and blockchain consulting.'
        },
        {
            id: 6,
            type: 'UI/UX Design',
            description: 'User interface and user experience design.'
        },
        {
            id: 7,
            type: 'Data Science',
            description: 'Data analysis, data visualization, and data engineering.'
        },
        {
            id: 8,
            type: 'Game Development',
            description: 'Game development using Unity and Unreal Engine.'
        },
    ])

    return(
        <div className="" style={{overflow: "visible"}}>
            <div className="d-flex w-100 h2 px-5 py-4" style={{ fontFamily: 'Futura' }}>
                Popular Services
            </div>
            <div className="carousel-container" style={{
            }}>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className="px-5"
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 4,
                            partialVisibilityGutter: 20
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={4}
                    swipeable
                >
                    {types.map((service) => {
                        return (
                            <ServiceTypeCard key={service.id} {...service}/>
                        )
                    })}
                </Carousel>
            </div>
        </div>
    );
}

