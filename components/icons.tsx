// Custom icon - unique to the app (space character indicator)
export function SpaceIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M18 9v4H6V9H4v6h16V9z" fill="currentColor" />
    </svg>
  )
}
