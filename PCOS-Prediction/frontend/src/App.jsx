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
    reg_exercise: "0",
    marriage_years: "",
    pregnant: "0",
    abortions: "0",
    hip: "",
    waist: "",
    waist_hip_ratio: "",
    blood_group: "A+"
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
        reg_exercise: parseInt(form.reg_exercise),
        marriage_years: parseFloat(form.marriage_years) || 0,
        pregnant: parseInt(form.pregnant),
        abortions: parseInt(form.abortions) || 0,
        hip: parseFloat(form.hip) || 0,
        waist: parseFloat(form.waist) || 0,
        waist_hip_ratio: parseFloat(form.waist_hip_ratio) || 0,
        blood_group: form.blood_group
      };
      const res = await axios.post(API_URL, payload);
      setResult(res.data);
    } catch {
      alert("Error fetching prediction");
    }
  };
  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "4px",
    display: "block"
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    boxSizing: "border-box"
  };

  return (
    <div>
      <h1>💗 PCOS Risk Predictor 💗</h1>
      
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Age</label>
        <input type="number" name="age" value={form.age} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>BMI</label>
        <input type="number" name="bmi" value={form.bmi} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Cycle Length (days)</label>
        <input type="number" name="cycle_length" value={form.cycle_length} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Irregular Cycle?</label>
        <select name="cycle_irregular" value={form.cycle_irregular} onChange={handleChange} style={inputStyle}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label style={labelStyle}>Weight Gain?</label>
        <select name="weight_gain" value={form.weight_gain} onChange={handleChange} style={inputStyle}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label style={labelStyle}>Hair Growth?</label>
        <select name="hair_growth" value={form.hair_growth} onChange={handleChange} style={inputStyle}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label style={labelStyle}>Marriage Duration (Years)</label>
        <input type="number" name="marriage_years" value={form.marriage_years} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Pregnant?</label>
        <select name="pregnant" value={form.pregnant} onChange={handleChange} style={inputStyle}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label style={labelStyle}>Number of Abortions</label>
        <input type="number" name="abortions" value={form.abortions} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Hip (inch)</label>
        <input type="number" name="hip" value={form.hip} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Waist (inch)</label>
        <input type="number" name="waist" value={form.waist} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Waist:Hip Ratio</label>
        <input type="number" name="waist_hip_ratio" value={form.waist_hip_ratio} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Blood Group</label>
        <select name="blood_group" value={form.blood_group} onChange={handleChange} style={inputStyle}>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label style={labelStyle}>Skin Darkening?</label>
        <select name="skin_darkening" value={form.skin_darkening} onChange={handleChange} style={inputStyle}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label style={labelStyle}>Hair Loss?</label>
        <select name="hair_loss" value={form.hair_loss} onChange={handleChange} style={inputStyle}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label style={labelStyle}>Pimples?</label>
        <select name="pimples" value={form.pimples} onChange={handleChange} style={inputStyle}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label style={labelStyle}>Frequent Fast Food?</label>
        <select name="fast_food" value={form.fast_food} onChange={handleChange} style={inputStyle}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label style={labelStyle}>Regular Exercise?</label>
        <select name="reg_exercise" value={form.reg_exercise} onChange={handleChange} style={inputStyle}>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <button type="submit" style={{ ...inputStyle, cursor: "pointer" }}>🔍 Predict</button>
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
