import { forwardRef } from 'react'
import { AudioPlayer } from './AudioPlayer'
import type { AudioPlayerRef } from './AudioPlayer'
import { AutoPlay } from './AutoPlay'
import type { AutoPlayRef } from './AutoPlay'
import { TagFilter } from './TagFilter'
import type { Tag } from '../data/timeline'

interface ControlStackProps {
  audioRef: React.RefObject<AudioPlayerRef | null>
  autoPlayRef: React.RefObject<AutoPlayRef | null>
  activeTags: Tag[]
  onTagsChange: (tags: Tag[]) => void
  totalEvents: number
  filteredCount: number
}

export const ControlStack = forwardRef<HTMLDivElement, ControlStackProps>(({
  audioRef,
  autoPlayRef,
  activeTags,
  onTagsChange,
  totalEvents,
  filteredCount,
}, ref) => {
  return (
    <div ref={ref} className="fixed bottom-4 left-4 z-50 flex flex-col-reverse gap-2">
      {/* Audio player - always visible, bottom of stack */}
      <AudioPlayer ref={audioRef} />
      
      {/* Auto-play - desktop only */}
      <div className="hidden md:block">
        <AutoPlay ref={autoPlayRef} speed={2400} />
      </div>
      
      {/* Tag filter - always visible */}
      <TagFilter 
        activeTags={activeTags} 
        onTagsChange={onTagsChange}
        totalEvents={totalEvents}
        filteredCount={filteredCount}
      />
    </div>
  )
})
