import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../../src/styles/match/MatchPage.module.css";

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch matches data from the API when the component loads
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await axios.get("/matches/");
        setMatches(data.results);
        setFilteredMatches(data.results);
      } catch (err) {
        console.error("Error fetching matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Function to filter matches based on search, date, and status
  const filterMatches = useCallback(() => {
    let filtered = [...matches];

    // Filter by team names
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (match) =>
          match.team1_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.team2_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((match) => match.status === statusFilter);
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(
        (match) =>
          new Date(match.scheduled_time) >= new Date(startDate)
      );
    }
    // Filter by end date
    if (endDate) {
      filtered = filtered.filter(
        (match) =>
          new Date(match.scheduled_time) <= new Date(endDate)
      );
    }

    setFilteredMatches(filtered);
  }, [matches, searchTerm, statusFilter, startDate, endDate]);

  // Run the filter function whenever filters or matches change
  useEffect(() => {
    filterMatches();
  }, [filterMatches]);

  // Display loading message while matches are being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.HomePage}>
      <h1>Upcoming Matches</h1>

      {/* Filter Bar */}
      <div className={styles.FilterBar}>
        {/* Search input for filtering by team names */}
        <input
          type="text"
          placeholder="Search by team name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.SearchInput}
        />

        {/* Dropdown to filter matches by status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.StatusSelect}
        >
          <option value="">All Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Date inputs for filtering matches by scheduled time */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.DateInput}
        />
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
            setStatusFilter("");
            setFilteredMatches(matches);
          }}
          className={styles.ResetButton}
        >
          Reset Filters
        </button>
      </div>

      {/* Matches Display */}
      <div className={styles.MatchesContainer}>
        {/* Display filtered matches */}
        {filteredMatches.length ? (
          filteredMatches.map((match) => (
            <Link
              key={match.id}
              to={`/matches/${match.id}`}
              className={styles.MatchCardLink}
            >
              <div className={styles.MatchCard}>
                <h3 className={styles.EventName}>{match.event_name}</h3>
                <p className={styles.Teams}>
                  <strong>{match.team1_name}</strong> vs{" "}
                  <strong>{match.team2_name}</strong>
                </p>
                <p className={styles.MatchDate}>
                  Date: {match.scheduled_time}
                </p>
                <p className={styles.MatchStatus}>
                  Status: <span>{match.status}</span>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
