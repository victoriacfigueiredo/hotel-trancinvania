import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PublishedReservationModel } from '../models/publishedReservation';

interface ReservationContextType {
    reservations: PublishedReservationModel[];
    setReservations: React.Dispatch<React.SetStateAction<PublishedReservationModel[]>>;
    selectedReservation: PublishedReservationModel | null;
    setSelectedReservation: React.Dispatch<React.SetStateAction<PublishedReservationModel | null>>;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [reservations, setReservations] = useState<PublishedReservationModel[]>([]);
    const [selectedReservation, setSelectedReservation] = useState<PublishedReservationModel | null>(null);

    return (
        <ReservationContext.Provider value={{ reservations, setReservations, selectedReservation, setSelectedReservation }}>
            {children}
        </ReservationContext.Provider>
    );
};

export const useReservationContext = () => {
    const context = useContext(ReservationContext);
    if (context === undefined) {
        throw new Error('useReservationContext must be used within a ReservationProvider');
    }
    return context;
};
