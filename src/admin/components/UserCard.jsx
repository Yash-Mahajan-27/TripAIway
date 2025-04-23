import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

function UserCard({ email, userData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl shadow-md border border-border p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{email}</h2>
          <p className="text-muted-foreground">Total Trips: {userData.totalTrips}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full"
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-4">
          {userData.trips.map((trip, index) => (
            <div
              key={trip.id}
              className="bg-background rounded-lg p-4 border border-border"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-foreground">
                  Trip #{index + 1}: {trip.userSelection.location}
                </h3>
                <span className="text-sm text-muted-foreground">
                  ID: {trip.id}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{trip.userSelection.totalDays} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-medium">{trip.userSelection.budget}</span>
                </div>
                <div className="flex items-center gap-2">
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