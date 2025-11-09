import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = params.then(async (params) => {
    return params.slug;
  });
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
      <EventDetails params={params} />
      </Suspense>

    </main>
  )
}

export default EventDetailsPage