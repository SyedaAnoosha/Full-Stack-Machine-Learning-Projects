// src/App.jsx
import { useState } from 'react';
import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/predict";

function App() {
  const [form, setForm] = useState({
    age: "",
    bmi: "",
    cycle_irregular: "1",
    cycle_length: "",
    weight_gain: "1",
    hair_growth: "1",
    skin_darkening: "0",
    hair_loss: "1",
    pimples: "1",
    fast_food: "1",
    reg_exercise: "0"
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        age: parseFloat(form.age),
        bmi: parseFloat(form.bmi),
        cycle_length: parseFloat(form.cycle_length),
        cycle_irregular: parseInt(form.cycle_irregular),
        weight_gain: parseInt(form.weight_gain),
        hair_growth: parseInt(form.hair_growth),
        skin_darkening: parseInt(form.skin_darkening),
        hair_loss: parseInt(form.hair_loss),
        pimples: parseInt(form.pimples),
        fast_food: parseInt(form.fast_food),
        reg_exercise: parseInt(form.reg_exercise)
      };
      const res = await axios.post(API_URL, payload);
      setResult(res.data);
    } catch {
      alert("Error fetching prediction");
    }
  };

  return (
    <div>
      <h1>💗 PCOS Risk Predictor 💗</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input type="number" name="bmi" placeholder="BMI" value={form.bmi} onChange={handleChange} required />
        <input type="number" name="cycle_length" placeholder="Cycle Length (days)" value={form.cycle_length} onChange={handleChange} required />

        <label>Irregular Cycle?</label>
        <select name="cycle_irregular" value={form.cycle_irregular} onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Weight Gain?</label>
        <select name="weight_gain" value={form.weight_gain} onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Hair Growth?</label>
        <select name="hair_growth" value={form.hair_growth} onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Skin Darkening?</label>
        <select name="skin_darkening" value={form.skin_darkening} onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Hair Loss?</label>
        <select name="hair_loss" value={form.hair_loss} onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Pimples?</label>
        <select name="pimples" value={form.pimples} onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Frequent Fast Food?</label>
        <select name="fast_food" value={form.fast_food} onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label>Regular Exercise?</label>
        <select name="reg_exercise" value={form.reg_exercise} onChange={handleChange}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <button type="submit">🔍 Predict</button>
      </form>

      {result && (
        <div style={{ marginTop: "1.5rem" }}>
          <h2>{result.prediction === 1 ? "⚠️ PCOS Likely" : "✅ PCOS Unlikely"}</h2>
          <p>Risk Score: <strong>{(result.risk_score * 100).toFixed(2)}%</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;
