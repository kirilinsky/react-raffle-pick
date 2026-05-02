'use client'

import { RafflePick } from 'react-raffle-picker'

const Wrap = () => {
  return (
    <div>
      <RafflePick min={1} max={100} interval={100} inertia onSelect={(v) => console.log(v)}>
        <RafflePick.Value animation="roll" className="my-value" />
        <RafflePick.Button startLabel="Pick" stopLabel="Stop" />
      </RafflePick>
    </div>
  )
}

export default Wrap
