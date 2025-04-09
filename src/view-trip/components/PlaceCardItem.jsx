import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlaceImg();
  }, [place])

  const GetPlaceImg = async () => {
    const data = {
      textQuery: place.placeName
    }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link 
      to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName + "," + place?.geoCoordinates} 
      target='_blank'
      className="block"
    >
      <div className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex p-4 gap-4">
          <div className="flex-shrink-0">
            <img 
              src={photoUrl ? photoUrl : '/road-trip-vacation.jpg'} 
              className="w-32 h-32 rounded-lg object-cover"
              alt={place.placeName}
            />
          </div>
          <div className="flex-grow space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{place.time}</span>
              <span className="text-sm font-medium text-yellow-500 dark:text-yellow-400">⭐ {place.rating}</span>
            </div>
            <h3 className="font-semibold text-lg text-foreground">{place.placeName}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{place.placeDetails}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600 dark:text-green-400">{place.ticketPricing}</span>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full"
              >
                <FaLocationDot className="mr-1" /> View on Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem;