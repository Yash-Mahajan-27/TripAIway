import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

function UserCard({ email, userData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl shadow-md border border-border p-4 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground break-words">{email}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Total Trips: {userData.totalTrips}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full text-sm w-full sm:w-auto"
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          {userData.trips.map((trip, index) => (
            <div
              key={trip.id}
              className="bg-background rounded-lg p-3 sm:p-4 border border-border"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1 sm:gap-0 mb-2">
                <h3 className="font-medium text-foreground text-sm sm:text-base">
                  Trip #{index + 1}: {trip.userSelection.location}
                </h3>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  ID: {trip.id}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{trip.userSelection.totalDays} days</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-medium">{trip.userSelection.budget}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-muted-foreground">Group:</span>
                  <span className="font-medium">{trip.userSelection.traveler}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserCard;