export function Loader() {
  return (
    <div className="h-[400px] max-[1600px]:h-[340px] max-[1400px]:h-[300px] max-[600px]:h-[240px] flex items-center justify-center text-3xl opacity-0 animate-[fade-in_400ms_200ms_ease_forwards] mt-[150px] mb-10">
      <div className="inline-block relative w-20 h-20">
        <LoaderRing delay="-0.45s" />
        <LoaderRing delay="-0.3s" />
        <LoaderRing delay="-0.15s" />
        <LoaderRing delay="0s" />
      </div>
    </div>
  )
}

function LoaderRing({ delay }: { delay: string }) {
  return (
    <div
      className="box-border block absolute w-16 h-16 m-2 border-4 rounded-full animate-[loading_1.2s_cubic-bezier(0.5,0,0.5,1)_infinite] border-primary border-t-transparent border-r-transparent border-b-transparent"
      style={{ animationDelay: delay }}
    />
  )
}
