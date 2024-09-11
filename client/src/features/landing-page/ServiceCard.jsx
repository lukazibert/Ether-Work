export default function ServiceCard(props) {
    return (
        <div className="card" style={{
            width: '18rem',
            height: '100%',
            borderRadius: '15px',
        }}
            //TODO: Add onClick to redirect to service page
            onClick={() => { }}
        >
            <img src={props.background_image} alt="" height={180} style={{ borderRadius: '15px 15px 0px 0px', }} />
            <div className="card-body m-2 d-flex flex-column justify-content-between">
                <div className="d-flex flex-row justify-content-between align-items-center">

                    <div className="card-title h3"
                        style={{ fontFamily: 'Futura', }}
                        //TODO: Add onClick to redirect to user page
                        onClick={() => { }}
                    >
                        {props.user_name}
                    </div>
                    <div className="user_image">
                        <img src={props.user_image} alt="" width={40} height={40} style={{ borderRadius: "40px" }} />
                    </div>
                </div>
                <div className="d-flex pt-2 text-secondary" style={{ fontFamily: 'Futura', textAlign: "center" }}>
                    {props.description}
                </div>
                <div className="d-flex flex-wrap gap-1 mt-2 justify-content-around">
                    {props.tags.map((tag, index) => {
                        return (
                            <span className="badge rounded-pill bg-secondary text-white" key={index}>
                                {tag}
                            </span>
                        );
                    })}
                </div>
                <div className="d-flex flex-column mt-2">
                    <div className="" style={{ fontFamily: "Futura", fontSize: "16px" }}>
                        Starting from
                    </div>
                    <div className="d-flex flex-row justify-content-center align-items-center pt-2" style={{ fontFamily: "Futura" }}>
                        <div className="" style={{ fontWeight: "bolder" }}>
                            {props.price_ETH} ETH
                        </div>
                        <div className="text-secondary ps-2">
                            ~ €{props.price_EUR}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}