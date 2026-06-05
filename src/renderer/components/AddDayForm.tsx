import { useState } from 'react'
import type { AddDayPayload } from '@/renderer/types.ts'

type AddDayFormProps = {
  dayNumber: number;
  disabled: boolean;
  onAddDay: (payload: AddDayPayload) => void;
}

export function AddDayForm({ dayNumber, disabled, onAddDay }: AddDayFormProps) {
  const [comment, setComment] = useState('')
  const [hasError, setHasError] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!comment) {
      setHasError(true)
      return
    }

    onAddDay({ comment })
    setComment('')
    setHasError(false)
  }

  return (
    <div className="habit">
      <div className="habit__day">{disabled ? '' : `Day ${dayNumber}`}</div>
      <form className="habit__form" onSubmit={handleSubmit}>
        <input
          className={`input_icon${hasError ? ' error' : ''}`}
          disabled={disabled}
          name="comment"
          onChange={event => {
            setComment(event.target.value)
            setHasError(false)
          }}
          placeholder="Comment"
          type="text"
          value={comment}
        />
        <img alt="Comment logo" className="input__icon" src="svg/Comment.svg" />
        <button className="button" disabled={disabled} type="submit">Submit</button>
      </form>
    </div>
  )
}
