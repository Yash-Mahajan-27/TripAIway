import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'

function InfoSection({trip}) {
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
    <div className="space-y-6">
      <div className="relative h-[400px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img 
          src={photoUrl ? photoUrl : '/road-trip-vacation.jpg'} 
          className="h-full w-full object-cover"
          alt={trip?.userSelection?.location}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            {trip?.userSelection?.location}
          </h1>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur-md text-white rounded-full px-4 py-2 text-sm font-medium">
              🗓️ {trip?.userSelection?.totalDays} Days
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white rounded-full px-4 py-2 text-sm font-medium">
              👥 {trip?.userSelection?.traveler} Travelers
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white rounded-full px-4 py-2 text-sm font-medium">
              💰 {trip?.userSelection?.budget} Budget
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoSection;