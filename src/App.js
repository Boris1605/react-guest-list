import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import GuestForm from './GuestForm';
import GuestList from './GuestList';

const baseUrl =
  'http://fc2d5cd3-db5d-4d57-8e41-120f719daa2c-00-337kyzzhk6qnf.kirk.replit.dev/guests/';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch guest data on initial render
    const firstFetch = () => {
      fetch(baseUrl)
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
    fetch(baseUrl, {
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
    fetch(`${baseUrl}/${id}`, { method: 'DELETE' })
      .then(() => setGuests(guests.filter((guest) => guest.id !== id)))
      .catch((error) => console.error('Error removing guest:', error));
  };

  // Function to toggle attending status of a guest
  const toggleAttending = (id, attending) => {
    // Make a PUT request to update attending status
    fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
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

  return (
    <div className={styles.app}>
      <h1 className={styles.header}>Guest List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <br />
          <GuestForm onAddGuest={addGuest} isLoading={isLoading} />
          <br />
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
