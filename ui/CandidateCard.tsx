import ScoreCircle from './ScoreCircle'

interface CandidateCardProps {
  name: string
  title: string
  score: number
  status?: string
  size?: 'sm' | 'md'
}

export default function CandidateCard({
  name,
  title,
  score,
  status = 'New',
  size = 'md',
}: CandidateCardProps) {
  const isSmall = size === 'sm'

  return (
    <div
      className={`flex items-center justify-between ${
        isSmall ? 'py-2 px-3' : 'py-3 px-4'
      } hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          className={`rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ${
            isSmall ? 'w-7 h-7' : 'w-8 h-8'
          }`}
        >
          <span className={`text-primary font-semibold ${isSmall ? 'text-xs' : 'text-xs'}`}>
            {name
              .split(' ')
              .slice(0, 2)
              .map((n) => n[0])
              .join('')}
          </span>
        </div>
        <div className="min-w-0">
          <p className={`font-semibold text-ink truncate ${isSmall ? 'text-xs' : 'text-sm'}`}>
            {name}
          </p>
          <p className={`text-muted truncate ${isSmall ? 'text-xs' : 'text-xs'}`}>{title}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
        <ScoreCircle
          score={score}
          size={isSmall ? 36 : 44}
          strokeWidth={isSmall ? 3 : 4}
          showLabel={false}
        />
        <span
          className={`px-2 py-0.5 rounded-full bg-slate-100 text-muted font-medium ${
            isSmall ? 'text-xs' : 'text-xs'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  )
}
