import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../../src/styles/events/EventsPage.module.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch all events from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get("/events/");
        setEvents(data.results);
        setFilteredEvents(data.results);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to filter events based on search term and date range
  const filterEvents = useCallback(() => {
    let filtered = [...events];

    // Filter by name
    if (searchTerm.trim()) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(
        (event) => new Date(event.start_date) >= new Date(startDate)
      );
    }

    // Filter by end date
    if (endDate) {
      filtered = filtered.filter(
        (event) => new Date(event.end_date) <= new Date(endDate)
      );
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, startDate, endDate]); // Memoize the function based on these dependencies

  // Re-run the filter function when search term, start date, or end date changes
  useEffect(() => {
    filterEvents(); // Call the memoized function
  }, [filterEvents]); // Dependency array for the effect

  // Show a loading message until data is fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.HomePage}>
      <h1>Upcoming Esports Events</h1>
      {/* Filter Bar */}
      <div className={styles.FilterBar}>
        <input
          type="text"
          placeholder="Search by event name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.SearchInput}
        />

        {/* Input for start date filter */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.DateInput}
        />

        {/* Input for end date filter */}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={styles.DateInput}
        />

        {/* Button to reset all filters */}
        <button
          onClick={() => {
            setSearchTerm("");
            setStartDate("");
            setEndDate("");
            setFilteredEvents(events); // Reset filters
          }}
          className={styles.ResetButton}
        >
          Reset Filters
        </button>
      </div>

      {/* Events Container */}
      <div className={styles.EventsContainer}>
        {/* Display filtered events */}
        {filteredEvents.length ? (
          filteredEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className={styles.EventCardLink}
            >
              <div className={styles.EventCard}>
                <img
                  src={event.image || "/default-event.jpg"}
                  alt={event.name}
                />
                {/* Event Name */}
                <h2>{event.name}</h2>
                {/* Event Description */}
                <p>{event.description}</p>
                {/* Event Dates */}
                <p className={styles.EventDate}>
                  {event.start_date} - {event.end_date}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No events match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
