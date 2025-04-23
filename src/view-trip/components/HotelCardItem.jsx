import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({item}) {
  const [photoUrl, setPhotoUrl] = useState();
  const [hotelExists, setHotelExists] = useState(false);
  const [placeId, setPlaceId] = useState(null);

  useEffect(() => {
    item && verifyAndGetHotelDetails();
  }, [item])

  const verifyAndGetHotelDetails = async() => { 
    if (!item?.hotelName) return;
    
    const data = {
      textQuery: item?.hotelName + " " + (item?.hotelAddress || "")
    }
    
    try {
      const result = await GetPlaceDetails(data);
      if (result?.data?.places && result.data.places.length > 0) {
        const place = result.data.places[0];
        setHotelExists(true);
        setPlaceId(place.id);
        
        if (place.photos && place.photos.length > 0) {
          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', place.photos[0].name);
          setPhotoUrl(PhotoUrl);
        }
      } else {
        setHotelExists(false);
      }
    } catch (error) {
      console.error("Error verifying hotel:", error);
      setHotelExists(false);
    }
  }

  if (!hotelExists) return null;

  // Generate direct hotel link
  const hotelLink = placeId 
    ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item?.hotelName + " " + (item?.hotelAddress || ""))}`;

  return (
    <Link 
      to={hotelLink}
      target='_blank'
      className="block"
    >
      <div className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:rounded-xl">
        <div className="relative">
          <img 
            src={photoUrl ? photoUrl : '/road-trip-vacation.jpg'} 
            className="h-36 sm:h-48 w-full object-cover rounded-t-xl dark:rounded-t-xl"
            alt={item?.hotelName}
          />
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium">
            ⭐ {item?.rating}
          </div>
        </div>
        <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
          <h3 className="font-semibold text-base sm:text-lg line-clamp-1 text-foreground">{item?.hotelName}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">📍 {item?.hotelAddress}</p>
          <p className="text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base">💰 {item?.price}</p>
        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem;