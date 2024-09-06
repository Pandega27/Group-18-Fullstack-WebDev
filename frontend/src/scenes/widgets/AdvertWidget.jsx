import FlexBetween from "../components/FlexBetween.jsx";
import WidgetWrapper from "../components/WidgetWrapper.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../css/AdvertWidget.css"


const AdvertWidget = () => {
  return (
    <div className="advertWidget">
    <WidgetWrapper>
      <FlexBetween>
        <div style={{fontSize:"15px", fontWeight:"500", padding:"10px 10px 10px 10px "}}>
          Sponsored
        </div>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="/frontend/public/assets/advert.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <div style={{padding:"10px 10px 10px 10px "}}>
          Get Your Nike Shoes
          <br></br>
          Nike.com.vn
        </div>
        
      </FlexBetween>
      <div style={{fontWeight:"500", padding:"10px 10px 10px 10px "}}>
        NIKE JUST DO IT!
      </div>
    </WidgetWrapper>
    </div>
  );
};


export default AdvertWidget;
