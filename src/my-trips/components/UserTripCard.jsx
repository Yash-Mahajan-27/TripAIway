import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({trip}) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlaceImg();
  }, [trip])

  const GetPlaceImg = async() => {
    const data = {
      textQuery: trip?.userSelection?.location
    }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link to={'/view-trip/'+trip?.id} className="block h-full">
      <div className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:rounded-xl h-full">
        <div className="relative">
          <img 
            src={photoUrl ? photoUrl : '/road-trip-vacation.jpg'} 
            className="h-36 sm:h-48 w-full object-cover rounded-t-xl dark:rounded-t-xl"
            alt={trip?.userSelection?.location}
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent">
            <h2 className="text-lg sm:text-xl font-semibold text-white line-clamp-1">
              {trip?.userSelection?.location}
            </h2>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
            <span>🗓️ {trip?.userSelection?.totalDays} Days</span>
            <span>•</span>
            <span>💰 {trip?.userSelection?.budget}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCard;
