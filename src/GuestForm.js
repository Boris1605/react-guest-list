import { useState } from 'react';

export default function GuestForm(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Handle key down event for submitting the form on Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && lastName.trim() !== '') {
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
        onChange={(event) => setFirstName(event.currentTarget.value)}
      />

      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        value={lastName}
        onChange={(event) => setLastName(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}