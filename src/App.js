import { useEffect, useState } from 'react';
import GuestForm from './GuestForm';
import GuestList from './GuestList';

const apiUrl = 'http://localhost:4000/guests';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch guest data on initial render
    const firstFetch = () => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setGuests(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log('Error fetching guest list:', error);
          setIsLoading(false);
        });
    };

    // Call the initial fetch function
    firstFetch();
  }, []);

  // Function to add a new guest
  const addGuest = (firstName, lastName) => {
    const newGuest = {
      firstName,
      lastName,
      attending: false,
    };

    // Make a POST request to add the new guest
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGuest),
    })
      .then((response) => response.json())
      .then((data) => setGuests([...guests, data]))
      .catch((error) => console.error('Error adding guest:', error));
  };

  // Function to remove a guest
  const removeGuest = (id) => {
    // Make a DELETE request to remove the guest
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
      .then(() => setGuests(guests.filter((guest) => guest.id !== id)))
      .catch((error) => console.error('Error removing guest:', error));
  };

  // Function to toggle attending status of a guest
  const toggleAttending = (id, attending) => {
    // Make a PATCH request to update attending status
    fetch(`${apiUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending }),
    })
      .then(() =>
        setGuests(
          guests.map((guest) =>
            guest.id === id ? { ...guest, attending } : guest,
          ),
        ),
      )
      .catch((error) =>
        console.error('Error updating attending status:', error),
      );
  };

  // Render the component
  return (
    <div>
      <h1>Guest List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <GuestForm onAddGuest={addGuest} />
          <GuestList
            guests={guests}
            onRemoveGuest={removeGuest}
            onToggleAttending={toggleAttending}
          />
        </>
      )}
    </div>
  );
}
