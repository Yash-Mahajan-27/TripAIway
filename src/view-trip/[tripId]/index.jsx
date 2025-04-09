import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import TripPlace from '../components/TripPlace';
import Footer from '../components/Footer';

function ViewTrip() {
  const {tripId} = useParams();
  const [trip, setTrip] = useState();

  const GetTripData = async() => {
    const docRef = doc(db, "AiTrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      toast('No trip found!')
    }
  }

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          <InfoSection trip={trip}/>
          <div className="bg-card rounded-2xl shadow-sm p-8 border border-border">
            <Hotels trip={trip}/>
          </div>
          <div className="bg-card rounded-2xl shadow-sm p-8 border border-border">
            <TripPlace trip={trip}/>
          </div>
          <Footer trip={trip}/>
        </div>
      </div>
    </div>
  )
}

export default ViewTrip;