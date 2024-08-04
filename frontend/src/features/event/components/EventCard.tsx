import Icon from "@/components/Icon";
import { Event } from "../types/eventType";
import { FA } from "@/constants/Icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }: { event: Event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const numOfImages = event?.imageUrls?.length || 0;

  const handlePreviousImage = () => {
    if (currentImageIndex === 0) return;

    setCurrentImageIndex(currentImageIndex - 1);
  };

  const handleNextImage = () => {
    console.log("Current", currentImageIndex);
    console.log("Total", numOfImages);
    if (currentImageIndex < numOfImages - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-[300px_1fr] bg-grey-100 gap-4 p-4 rounded-md border border-gray-200 shadow hover:ring-2 ring-totysseyOrange duration-200">
      {/* Image */}
      <div className=" w-full h-[300px] flex items-center justify-center border relative">
        {event.imageUrls && event.imageUrls.length > 0 ? (
          <img
            src={event.imageUrls[currentImageIndex]}
            alt="event"
            className="w-full h-full object-cover"
          />
        ) : (
          <Icon icon={FA.Image} className="text-[100px] text-gray-200" />
        )}

        {/* Previous Image Button */}
        <button
          hidden={numOfImages === 0}
          onClick={handlePreviousImage}
          disabled={currentImageIndex === 0}
          className="absolute size-10 rounded-full left-2 bg-white hover:opacity-95 cursor-pointer duration-200 opacity-65 disabled:opacity-15"
        >
          <Icon icon={FA.ChevronLeft} />
        </button>

        {/* Next Image Button */}
        <button
          hidden={numOfImages === 0}
          onClick={handleNextImage}
          disabled={numOfImages < 1 || currentImageIndex === numOfImages - 1}
          className="absolute size-10 rounded-full right-2 bg-white hover:opacity-95 cursor-pointer duration-200 opacity-65 disabled:opacity-15"
        >
          <Icon icon={FA.ChevronRight} />
        </button>
      </div>
      {/* Details */}
      <div className="px-6 py-3 flex flex-col">
        {/* Upper Portion */}
        <div className="flex-1">
          {/* Name */}
          <div className="flex space-x-2 items-center mb-2">
            <Link to={`/event/${event._id}`}>
              <h2 className="text-2xl font-bold text-totysseyBlue cursor-pointer">
                {event.title}
              </h2>
            </Link>
            {event.isFree && (
              <p className="text-[11px] px-2 py-1 text-white bg-green-600 rounded-full w-fit ">
                FREE
              </p>
            )}
          </div>

          {/* Location */}
          <p className="mb-2 text-sm text-gray-500 font-bold">
            {event.location}
          </p>

          {/* Description */}
          <p className="line-clamp-4 text-gray-700">{event.description}</p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 text-xs text-gray-500 items-center">
          {event.categories && event.categories.length > 0 && (
            <>
              {event.categories.slice(0, 3).map((category) => {
                return (
                  <div
                    className="px-2 py-1 bg-grey-200 border border-gray-200 rounded-full w-fit"
                    key={event._id}
                  >
                    {category}
                  </div>
                );
              })}
              {event.categories.length > 3 && (
                <span>+{event.categories.length - 3} more</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
