import React from "react";

function FormComponent({ formData, setFormData }) {
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <form>
      <label htmlFor="front">
        Front
        <textarea
          id="front"
          type="text"
          name="front"
          onChange={handleChange}
          value={formData.front}
          placeholder="Front side of card"
        ></textarea>
      </label>
      <label htmlFor="back">
        Back
        <textarea
          id="back"
          type="text"
          name="back"
          onChange={handleChange}
          value={formData.back}
          placeholder="Back side of card"
        ></textarea>
      </label>
    </form>
  );
}

export default FormComponent;
