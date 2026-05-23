import { FeedHeader } from '@/components/feed/feed-header'
import { EventFeed } from '@/components/feed/event-feed'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <FeedHeader />
      <EventFeed />
    </div>
  )
}
