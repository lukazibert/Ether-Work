export default function Footer() {
    return (
      <div
        className=""
        style={{
          width: "100vw",
          height: "200px",
          backgroundColor: "white",
          paddingTop: "50px",
        }}
      >
        <div
          className=""
          style={{
            width: "95vw",
            height: "2px",
            backgroundColor: "#E5E5E5",
            margin: "auto",
          }}
        ></div>
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className=""
            style={{
              textAlign: "justify",
              width: "50%",
              padding: "50px 50px",
              fontFamily: "Futura",
            }}
          >
            Our decentralized platform enables secure and reliable exchange of work between programmers. With smart contracts and a dual-deposit escrow system, we ensure quality, trust, and fair payment without intermediaries. Join our growing community of talents and get the best programming services.
          </div>
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "row",
              width: "50%",
              justifyContent: "space-around",
              padding: "50px 0px",
              fontFamily: "Futura",
            }}
          >
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div className="" style={{ fontWeight: "bold" }}>
                Navigation
              </div>
              <div className="">About</div>
              <div className="">Home</div>
              <div className="">Profile</div>
            </div>
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                fontFamily: "Futura",
              }}
            >
              <div className="" style={{ fontWeight: "bold" }}>
                Legal
              </div>
              <div className="">Terms of Service</div>
              <div className="">Privacy Policy</div>
              <div className="">Terms of use</div>
            </div>
          </div>
        </div>
      </div>
    );
  }