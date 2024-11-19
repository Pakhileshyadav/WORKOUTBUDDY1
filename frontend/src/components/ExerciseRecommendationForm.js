import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ExerciseRecommendationForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const [exercises, setExercises] = useState([]);

  // Define inbuilt exercises
  const inbuiltExercises = [
    { id: 1, name: "Push-ups", type: "Strength" },
    { id: 2, name: "Sit-ups", type: "Strength" },
    { id: 3, name: "Jumping Jacks", type: "Cardio" },
    { id: 4, name: "Squats", type: "Strength" },
    { id: 5, name: "Plank", type: "Strength" },
    { id: 6, name: "Lunges", type: "Strength" },
    { id: 7, name: "Burpees", type: "Cardio" },
    { id: 8, name: "Mountain Climbers", type: "Cardio" },
    { id: 9, name: "Deadlifts", type: "Strength" },
    { id: 10, name: "Bench Press", type: "Strength" },
    { id: 11, name: "Cycling", type: "Cardio" },
    { id: 12, name: "Running", type: "Cardio" },
    { id: 13, name: "Yoga", type: "Flexibility" },
    { id: 14, name: "Pilates", type: "Flexibility" },
    // Add more exercises as needed
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const preferences = { goal, experience, type };

    // Filter exercises based on the selected type
    let filteredExercises = inbuiltExercises;
    if (type) {
      filteredExercises = inbuiltExercises.filter(
        (exercise) => exercise.type === type
      );
    }

    // For demonstration purposes, set exercises to filtered exercises
    setExercises(filteredExercises);

    setGoal("");
    setExperience("");
    setType("");
    setError(null);
    setEmptyFields([]);
    // dispatch({ type: "SET_WORKOUT", payload: json }); // Update context with recommendations
  };

  return (
    <form className="recommend" onSubmit={handleSubmit}>
      <h3>Get Exercise Recommendations</h3>

      <div style={{ marginBottom: '20px' }}>
        <label>Fitness Goal:</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="">Select goal</option>
          <option value="Lose Weight">Lose Weight</option>
          <option value="Build Muscle">Build Muscle</option>
          <option value="Improve Endurance">Improve Endurance</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Experience Level:</label>
        <select value={experience} onChange={(e) => setExperience(e.target.value)}>
          <option value="">Select experience level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Preferred Exercise Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select exercise type</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
        </select>
      </div>

      <button style={{ padding: '10px' }}>Get Recommendations</button>
      {error && <div className="error">{error}</div>}

      <h4>Recommended Exercises:</h4>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </form>
  );
};

export default ExerciseRecommendationForm;
