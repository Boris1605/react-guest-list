export default function GuestList(props) {
  // Render the list of guests with checkboxes and remove buttons
  return (
    <div>
      {props.guests.map((guest) => (
        <div key={`guest-${guest.id}`} data-test-id="guest">
          <p>{`${guest.firstName} ${guest.lastName}`}</p>
          <br />
          <input
            type="checkbox"
            id={`attending-${guest.id}`}
            aria-label={`${guest.firstName} ${guest.lastName} attending status`}
            checked={guest.attending}
            onChange={(event) =>
              props.onToggleAttending(guest.id, event.currentTarget.checked)
            }
          />
          <label htmlFor={`attending-${guest.id}`}>Attending</label>
          <button
            onClick={() => props.onRemoveGuest(guest.id)}
            aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
