import { useState } from 'react';

export default function GuestForm(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Handle key down event for submitting the form on Enter
  const handleKeyDown = (event) => {
    if (
      event.key === 'Enter' &&
      lastName.trim() !== '' &&
      firstName.trim() !== ''
    ) {
      props.onAddGuest(firstName.trim(), lastName.trim());
      setFirstName('');
      setLastName('');
    }
  };

  // Render the component
  return (
    <div>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        disabled={props.isLoading}
      />

      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={props.isLoading}
      />
      {props.isLoading && <p>Loading...</p>}
    </div>
  );
}
