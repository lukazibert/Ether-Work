import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ServiceCard from './ServiceCard';


export default function PopularChoices() {

    const [popularChoices, setPopularChoices] = useState([])

    useEffect(() => {
        //TODO: fetch popular choices from backend
        // fetch('http://localhost:5000/api/popular-choices')
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        setPopularChoices([
            {
                id: 1,
                user_name: 'John Doe',
                user_image: 'https://picsum.photos/id/100/200',
                background_image: 'https://picsum.photos/id/101/200',
                description: 'I will build a custom WordPress website for your business',
                tags: ['web', 'WordPress', 'eCommerce'],
                category: 'Web Development',
                price_ETH: 0.045,
                price_EUR: 100,
            },
            {
                id: 2,
                user_name: 'Jane Smith',
                user_image: 'https://picsum.photos/id/102/200',
                background_image: 'https://picsum.photos/id/103/200',
                description: 'I will train a computer vision model to classify images',
                tags: ['machine learning', 'computer vision', 'Python'],
                category: 'AI Services',
                price_ETH: 0.067,
                price_EUR: 150,
            },
            {
                id: 3,
                user_name: 'Sarah Lee',
                user_image: 'https://picsum.photos/id/104/200',
                background_image: 'https://picsum.photos/id/105/200',
                description: 'I will build and deploy cloud infrastructure on AWS for your business',
                tags: ['cloud', 'AWS', 'DevOps'],
                category: 'Cloud Services',
                price_ETH: 0.112,
                price_EUR: 250,
            },

            {
                id: 4,
                user_name: 'Michael Chen',
                user_image: 'https://picsum.photos/id/106/200',
                background_image: 'https://picsum.photos/id/107/200',
                description: 'I will develop a mobile app for iOS and Android using React Native',
                tags: ['mobile', 'iOS', 'Android', 'React Native'],
                category: 'Mobile App Development',
                price_ETH: 0.158,
                price_EUR: 350,
            },

            {
                id: 5,
                user_name: 'Jessica Thompson',
                user_image: 'https://picsum.photos/id/108/200',
                background_image: 'https://picsum.photos/id/109/200',
                description: 'I will audit your website and application security and recommend improvements',
                tags: ['security', 'auditing', 'testing'],
                category: 'Security Services',
                price_ETH: 0.084,
                price_EUR: 200,
            },

            {
                id: 6,
                user_name: 'Daniel Lee',
                user_image: 'https://picsum.photos/id/110/200',
                background_image: 'https://picsum.photos/id/111/200',
                description: 'I will analyze your business data and generate insights with machine learning',
                tags: ['analytics', 'business intelligence', 'data science'],
                category: 'Data Science',
                price_ETH: 0.102,
                price_EUR: 230,
            }
        ]);
    }, [])


    return (
        <div className="" style={{overflow: "visible"}}>
            <div className="d-flex w-100 h2 px-5 py-4" style={{ fontFamily: 'Futura' }}>
                Popular Choices
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
                    {popularChoices.map((service) => {
                        return (
                            <ServiceCard key={service.id} {...service} />
                        )
                    })}
                </Carousel>
            </div>
        </div>
    );
}