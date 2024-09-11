import React, { useState } from 'react';

export default function SearchComponent(props) {

    const [searchedTags, setSearchedTags] = useState([
        'web',
        'WordPress',
        'eCommerce',
        'machine learning',
    ]);


    return (
        <div className="mx-5 mt-3 mb-5">
            <div className="d-flex w-100 h2" style={{ fontFamily: 'Futura' }}>
                Find exacly what you need
            </div>
            <div className="mt-5" style={{
                width: "100%",
                height: "100%",
            }}>
                <div className="d-flex flex-column " style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#F2F2F2",
                    borderRadius: "15px",
                }}>
                    <div className="d-flex flex-row mx-3 my-3 gap-3">
                        <input type="text"
                            placeholder="What are you looking for..."
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                border: "none",
                                outline: "none",
                                paddingInlineStart: "20px",
                            }} />
                        <div className="btn bg-white px-5" style={{
                            borderRadius: "10px",
                            color: "#7749F8",
                            fontWeight: "600"
                        }}>Search</div>
                    </div>
                    <div className="d-flex flex-row mx-3 my-2 gap-3 align-items-center">
                        <div className="h6">Tags:</div>
                        <div className="d-flex flex-row gap-3 align-items-center">
                            {searchedTags.map((tag, index) => {
                                return (
                                    <span className="badge rounded-pill bg-secondary text-white" key={index}>
                                        {tag}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}