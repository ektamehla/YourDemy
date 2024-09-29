import React, { useState } from "react";
import axios from "axios";

function FeedbackForm() {
  const [videoLength, setVideoLength] = useState("");
  const [videoOptions, setVideoOptions] = useState("");
  const [quizSuitable, setQuizSuitable] = useState("");
  const [quizOptions, setQuizOptions] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const handleFeedback = async (e) => {
    e.preventDefault();
    const feedbackData = {
      video_chunk_option_suitable: videoLength,
      video_length_options: videoOptions,
      quiz_option_suitable: quizSuitable,
      quiz_options: quizOptions,
      suggestions: suggestions,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/feedback/", feedbackData);
      // Handle successful feedback submission
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Feedback error:", error.response.data);
      // Handle feedback submission error
      alert("Failed to submit feedback!");
    }
  };

  return (
    <div className="container feedbackform">
      <h2>Feedback Form</h2>
      <form onSubmit={handleFeedback}>
        <label htmlFor="videoLength">
          Were the options provided for video chunk length suitable for the course?
        </label><br />
        <input
          type="radio"
          id="yes_videoLength"
          name="videoLength"
          value="Yes"
          onChange={(e) => setVideoLength(e.target.value)}
          checked={videoLength === "Yes"}
        />
        <label htmlFor="yes_videoLength">Yes</label>
        <input
          type="radio"
          id="no_videoLength"
          name="videoLength"
          value="No"
          onChange={(e) => setVideoLength(e.target.value)}
          checked={videoLength === "No"}
        />
        <label htmlFor="no_videoLength">No</label><br /><br />

        <label htmlFor="options">If no, what options would you like to have?</label><br />
        <select
          id="options"
          name="videoOptions"
          onChange={(e) => setVideoOptions(e.target.value)}
          value={videoOptions}
        >
          <option value="15">15 mins</option>
          <option value="20">20 mins</option>
          <option value="10">10 mins</option>
          <option value="25">25 mins</option>
          <option value="30">30 mins</option>
        </select><br /><br />

        <label htmlFor="quizOptions">Were the options for suitable for you?</label><br />
        <input
          type="radio"
          id="yes_quizOptions"
          name="quizSuitable"
          value="Yes"
          onChange={(e) => setQuizSuitable(e.target.value)}
          checked={quizSuitable === "Yes"}
        />
        <label htmlFor="yes_quizOptions">Yes</label>
        <input
          type="radio"
          id="no_quizOptions"
          name="quizSuitable"
          value="No"
          onChange={(e) => setQuizSuitable(e.target.value)}
          checked={quizSuitable === "No"}
        />
        <label htmlFor="no_quizOptions">No</label><br /><br />

        <label htmlFor="quizOptions">If no, what options would you like to have?</label><br />
        <select
          id="quizOptions"
          name="quizOptions"
          onChange={(e) => setQuizOptions(e.target.value)}
          value={quizOptions}
        >
          <option value="15">Quiz every 15 mins</option>
          <option value="20">Quiz every 20 mins</option>
          <option value="10">Quiz half way through</option>
          <option value="25">Quiz at the end of the module</option>
          <option value="30">Quiz at the end of the course</option>
        </select><br /><br />

        <label htmlFor="suggestions">What suggestions would you have to improve the website?</label><br />
        <textarea
          id="suggestions"
          name="suggestions"
          onChange={(e) => setSuggestions(e.target.value)}
          value={suggestions}
        ></textarea><br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
