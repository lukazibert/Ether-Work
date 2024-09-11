export default function ServiceTypeCard(props) {
    return(
        <div className="card text-white bg-secondary m-2 d-flex flex-column justify-content-between" style={{
            width: '18rem',
            height: '8rem',
            borderRadius: '15px',
        }}>
            <div className="card-body">
                <h5 className="h4 card-title">{props.type}</h5>
                <p className="card-text">{props.description}</p>
            </div>
        </div>
    );
}