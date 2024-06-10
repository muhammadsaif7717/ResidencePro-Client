
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Location = () => {
  // Coordinates of the location you want to show on the map
  const position = [23.8103, 90.4125]; // Latitude, Longitude

  return (
    <div className="my-10">
      <h1 className="text-center mb-5 text-3xl font-bold ">Our Hotel{`'`}s Location</h1>
      <div className=" rounded-xl overflow-hidden">
        <div  className="rounded-xl w-[95%] h-[200px] md:h-[300px] lg:h-[400px]  md:w-full mx-auto">
          <MapContainer center={position} zoom={11} className="rounded-xl">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Location;
