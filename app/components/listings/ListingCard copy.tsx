'use client';

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Image from 'next/image'
import { SafeUser } from "@/app/types";

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionId?: string;
    currentUser: SafeUser
}

const ListingCard = ({
    data, disabled, onAction, actionId = '', reservation

}: ListingCardProps) => {
    const router = useRouter()
    const { getByValue } = useCountries()

    const location = getByValue(data.locationValue)
    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (disabled) {
            return
        }

        onAction?.(actionId)
    }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        }
        return data.price
    }, [reservation, data.price])

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null
        }
        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')}`

    }, [reservation])

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="col-span-1   cursor-pointer group">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <Image
                    fill
                    alt="Listing"
                    src={data.imageSrc}
                    className="
                        object-cover
                        h-full
                        w-full
                        group-hover:scale-110
                        transition
                    " />
            </div>

        </div>
    )
}

export default ListingCard