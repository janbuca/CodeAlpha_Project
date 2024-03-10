import React, { useState } from 'react';

const AgeCalculator = () => {

    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const calculatedAge = calculateAge(dob);
        setAge(calculatedAge.toString());
      };

    const calculateAge = (dateString) => {
        const dob = new Date(dateString);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
      
        // If the birthday has not yet occurred this year, subtract 1 from the age
        if (
          today.getMonth() < dob.getMonth() ||
          (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
        ) {
          return age - 1;
        }
        return age;
      };
  // State and local variables

  // Handlers

  // UI rendering

  return (
    <div className="age-calculator">
      <form onSubmit={handleSubmit}>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(event) => setDob(event.target.value)}
        />
        <button type="submit">Calculate Age</button>
      </form>
      {age && <p>Your age is: {age}</p>}
    </div>
  );
};

export default AgeCalculator;