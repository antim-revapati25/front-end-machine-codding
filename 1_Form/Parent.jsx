import { useState } from "react";
import Form from "./Form";

export default function Parent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    skills: [],
    preferences: {
      newsletter: false,
    },
  });
  return (
    <>
      <h1>I am parent</h1>
      <p> name: {formData.name}</p>
      <p> age: {formData.age}</p>
      <p> email: {formData.email}</p>
      <Form formData={formData} setFormData={setFormData} />
    </>
  );
}
