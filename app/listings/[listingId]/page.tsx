import getCurrentUser from "@/app/actions/getCurrentUser copy";
import getListingById from "@/app/actions/getListingById"
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import ListingClient from './ListingClient'

interface IParams {
    listingId?: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params)
    const reservations = await getReservations(params)
    const currentUser = await getCurrentUser()

    if (!listing) {
        return <ClientOnly>
            <EmptyState />
        </ClientOnly>
    }


    return <ClientOnly>
        <ListingClient listing={listing} />
    </ClientOnly>
}

export default ListingPage