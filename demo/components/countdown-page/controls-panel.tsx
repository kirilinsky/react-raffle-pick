'use client'

import {
  ControlGroup,
  NumberField,
  SelectField,
  Segmented,
  SliderField,
  TextArea,
  ToggleField,
} from '../playground/fields'
import {
  DEFAULT_COUNTDOWN_STATE,
  type CountdownAnimation,
  type CountdownState,
} from './types'

const ANIMATIONS: ReadonlyArray<CountdownAnimation> = ['none', 'roll', 'fade', 'blur', 'reel']

export function CountdownControlsPanel({
  state,
  onChange,
}: {
  state: CountdownState
  onChange: (next: CountdownState) => void
}) {
  const set = <K extends keyof CountdownState>(k: K, v: CountdownState[K]) => {
    onChange({ ...state, [k]: v })
  }

  return (
    <aside className="flex flex-col gap-6 self-start rounded-3 border border-line bg-bg-card p-6 lg:sticky lg:top-20">
      <ControlGroup label="Mode">
        <Segmented
          value={state.mode}
          onChange={(v) => set('mode', v)}
          options={[
            { value: 'range', label: 'Range' },
            { value: 'items', label: 'Items' },
          ]}
        />
      </ControlGroup>

      {state.mode === 'range' ? (
        <ControlGroup label="Range">
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Min" value={state.min} onChange={(n) => set('min', n)} />
            <NumberField label="Max" value={state.max} onChange={(n) => set('max', n)} />
          </div>
        </ControlGroup>
      ) : (
        <TextArea label="Items (one per line)" value={state.itemsRaw} onChange={(s) => set('itemsRaw', s)} />
      )}

      <SliderField
        label="Seconds"
        value={state.seconds}
        onChange={(n) => set('seconds', n)}
        min={1}
        max={20}
        step={1}
      />

      <SelectField<CountdownAnimation>
        label="Value animation"
        value={state.animation}
        onChange={(v) => set('animation', v)}
        options={ANIMATIONS}
      />

      <ToggleField label="Inertia" value={state.inertia} onChange={(b) => set('inertia', b)} />

      <ToggleField
        label="Custom render (children)"
        value={state.customRender}
        onChange={(b) => set('customRender', b)}
      />

      <button
        type="button"
        onClick={() => onChange(DEFAULT_COUNTDOWN_STATE)}
        className="self-start rounded-2 border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-2 transition-colors hover:bg-bg-2"
      >
        Reset
      </button>
    </aside>
  )
}
