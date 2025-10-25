# ⚛️ React Coding Practices — A Practical Guide

This document explains essential **React coding patterns** with clear reasoning, examples, and memory tricks to make them stick. Ideal for mastering real-world React form handling, event logic, and conditional rendering.

---

## 🧱 1️⃣ Component Declaration — Arrow Function vs Normal Function

### ❌ Problem Example:

```jsx
export default TabForm = () => {
  return <div>I am Tab Form</div>;
};
```

This throws an error because **the function is not defined before being exported**.
Some bundlers (like Babel) transpile it automatically, but in stricter environments (like Vite), it fails.

### ✅ Correct Solution:

```jsx
function TabForm() {
  return <div>I am Tab Form</div>;
}
export default TabForm;
```

📘 **Why?**

* Regular functions are hoisted, so they exist before export.
* Arrow functions are not hoisted; they must be defined before use.

---

## 🪝 2️⃣ Rules of Hooks

Hooks like `useState`, `useEffect`, etc., **must always appear at the top level** of a React component.

### ❌ Don’t do this:

```jsx
if (someCondition) {
  const [data, setData] = useState([]); // ❌ illegal placement
}
```

### ✅ Do this:

```jsx
const [data, setData] = useState([]);
if (someCondition) {
  // logic here
}
```

🧠 **Reason**: React tracks hooks in order. If a hook runs conditionally or inside a loop, React loses track of which hook corresponds to which state.

📌 **Memory Trick:** “Hooks live at the top of your component tree.”

---

## 🖱️ 3️⃣ Event Handling — Don’t Call Functions Directly

### ❌ Wrong:

```jsx
<div className="tabs" onClick={setActiveTab(index)}>
  {item.name}
</div>
```

This **calls** the function immediately — not on click.

### ✅ Correct:

```jsx
<div className="tabs" onClick={() => setActiveTab(index)}>
  {item.name}
</div>
```

💡 **Use an arrow function** so it executes **only when the event occurs.**

---

## 🧩 4️⃣ Returning Objects from Arrow Functions

### ❌ Wrong:

```jsx
setData((prevState) => {
  ...prevState,
  [item]: event.target.value,
});
```

This doesn’t return anything — it’s treated as a function block.

### ✅ Correct:

```jsx
setData((prevState) => ({
  ...prevState,
  [item]: event.target.value,
}));
```

Or with explicit return:

```jsx
setData((prevState) => {
  return {
    ...prevState,
    [item]: event.target.value,
  };
});
```

💡 **Memory Trick:**

> Arrow function + object → wrap in parentheses.

🧠 Think: `() => ({})` = “return this object.”

Without parentheses, `{}` = “function block.”

---

## 💬 5️⃣ Event Handling — Passing Event vs Not Passing Event

✅ `onChange={handleChange}`
✅ `onChange={(e) => handleChange(e)}`

Both are identical because React automatically passes the event object as the first argument.

Use the second form **only if** you need to pass extra arguments:

```jsx
onChange={(e) => handleChange(e, "name")}
```

---

## ⚙️ 6️⃣ Updating State with Previous Value

When updating based on previous state, always use the callback version:

```jsx
setData((prevState) => ({
  ...prevState,
  [item]: event.target.value,
}));
```

🧠 This ensures you get the **latest state** — important when React batches updates.

---

## 🧠 7️⃣ Conditional Rendering — `&&`, `||`, `? :`

### 1️⃣ **&& (AND)** → Render if true

```jsx
{error.name && <span>{error.name}</span>}
```

✅ If `error.name` exists → shows `<span>`.
❌ If false → renders nothing.

### 2️⃣ **|| (OR)** → Fallback if false

```jsx
<p>{user.name || "Guest"}</p>
```

✅ Shows `user.name` if exists.
❌ Else shows “Guest.”

### 3️⃣ **Ternary ? :** → Choose one of two

```jsx
{isLoggedIn ? <Dashboard /> : <LoginPage />}
```

### 4️⃣ Combined Example:

```jsx
{error.name && <p style={{ color: "red" }}>{error.name}</p>}
{data.interest.length === 0 && <p>Please select at least one interest.</p>}
<p>{data.name || "No name entered yet"}</p>
{activeTab === tabs.length - 1 ? <button>Submit</button> : <button>Next</button>}
```

### 📊 Quick Summary Table

| Operator | Meaning             | Usage                 |                   |                    |
| -------- | ------------------- | --------------------- | ----------------- | ------------------ |
| `&&`     | Render only if true | Conditional rendering |                   |                    |
| `        |                     | `                     | Fallback if false | Default text/value |
| `? :`    | Choose between two  | Toggle UI states      |                   |                    |

---

## 🧭 Visual Recap

```
Hooks → Always on top
↓
Functions → Call only when needed (use callbacks)
↓
State Updates → Return objects properly
↓
Conditional Rendering → &&, ||, ?:
```

---

## 🧠 Key Takeaways

✅ Always define hooks at the top
✅ Wrap returned objects in `()`
✅ Use callback functions in events
✅ Don’t call event handlers directly
✅ Understand `&&`, `||`, and ternary for dynamic UI

---

💬 **Pro Tip:** Whenever your state update uses the previous state → use the callback form.

> React = Predictability + Immutability + Readability
