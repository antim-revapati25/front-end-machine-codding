import { useState } from "react";

export default function Form({ formData, setFormData }) {
  const [newSkill, setNewSkill] = useState("");
  // we are not passing event but react passing internally
  const handleAddSkill = () => {
    // return if found empty skill
    if (!newSkill.trim()) return;

    setFormData((prevState) => {
      return {
        ...prevState,
        skills: [...prevState.skills, newSkill.trim()],
      };
    });
    setNewSkill("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target.checked);

    if (type === "checkbox") {
      setFormData((prev) => {
        return {
          ...prev,
          preferences: { ...prev.preferences, [name]: checked },
        };
      });
    } else {
      setFormData((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };
  return (
    <>
      <h1>I am working fine</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Subscribe to newsletter:
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.preferences.newsletter}
            onChange={handleChange}
          />
        </label>

        <div>
          <h4>Skills: </h4>
          <ul>
            {/* dont forget the return keyword or just wrap obj into () right after =>, it means the same that return that obj wrapped in () */}
            {formData.skills.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
          <input
            type="text"
            placeholder="Add a new Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button type="button" onClick={handleAddSkill}>
            Add Skill
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
