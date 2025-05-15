import type { FC } from "react";
import type { Place } from "../../types";

interface Props {
  place: Place;
}

const Overview: FC<Props> = ({ place }) => {
  return (
    <div>
      <div className="border-b border-zinc-300 pb-2 flex gap-6 text-zinc-500">
        <span className="cursor-pointer text-blue-500 font-semibold">
          Genel
        </span>
        <span className="cursor-pointer">Odalar</span>
        <span className="cursor-pointer">Özellikler</span>
        <span className="cursor-pointer">Kurallar</span>
      </div>

      <div className="flex justify-between max-lg:flex-col gap-5 mt-5">
        <div>
          <h1 className="text-xl font-semibold mb-2">Özellikler</h1>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">
            {place.amenities.map((item) => (
              <span className="border border-gray-300 rounded-md p-2 min-w-[200px]">
                {item}
              </span>
            ))}
          </div>
        </div>

        <iframe
          loading="lazy"
          className="w-full h-full aspect-video rounded-md lg:h-[300px] lg:max-w-[720px]"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAyf-HfQR6bKGTAX-troRIUxP2C-cvrFXA
    &q=${place.location}`}
        ></iframe>
      </div>
    </div>
  );
};

export default Overview;
