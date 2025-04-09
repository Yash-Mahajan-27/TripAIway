import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({item}) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    item && GetPlaceImg();
  }, [item])

  const GetPlaceImg = async() => { 
    const data = {
      textQuery: item?.hotelName
    }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link 
      to={'https://www.google.com/maps/search/?api=1&query='+item?.hotelName+ "," +item?.hotelAddress} 
      target='_blank'
      className="block"
    >
      <div className="bg-card rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:rounded-xl">
        <div className="relative">
          <img 
            src={photoUrl ? photoUrl : '/road-trip-vacation.jpg'} 
            className="h-48 w-full object-cover rounded-t-xl dark:rounded-t-xl"
            alt={item?.hotelName}
          />
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
            ⭐ {item?.rating}
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1 text-foreground">{item?.hotelName}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">📍 {item?.hotelAddress}</p>
          <p className="text-blue-600 dark:text-blue-400 font-medium">💰 {item?.price}</p>
        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem;