import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { motion } from "framer-motion";


const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 18 } },
};

const inputVariants = {
  hover: { scale: 1.02 },
};

const Form = forwardRef(function AnimatedForm(_, ref) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    father: "",
    mother: "",
    course: "",
    dob: "",
    gender: "",
    branches: [],
    address: "",
    photo: null,
  });

  const fileInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    resetForm() {
      setFormData({
        name: "",
        mobile: "",
        email: "",
        father: "",
        mother: "",
        course: "",
        dob: "",
        gender: "",
        branches: [],
        address: "",
        photo: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = null;
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleBranch = (branch) => {
    setFormData((s) => {
      const updated = s.branches.includes(branch)
        ? s.branches.filter((b) => b !== branch)
        : [...s.branches, branch];
      return { ...s, branches: updated };
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0] || null;
    setFormData((s) => ({ ...s, photo: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, photo: formData.photo ? formData.photo.name : null };
    console.log("Submitting:", payload);
    alert("Form submitted! Check console for payload (demo).");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-200 to-indigo-200 py-12 px-6 relative">
      {/* Decorative faint image panel */}
      {/* <div className="absolute inset-0 pointer-events-none opacity-10">
        <img src={bgImage} alt="decor" className="w-full h-full object-cover" />
      </div> */}

      <motion.form
        onSubmit={handleSubmit}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-10 z-10"
      >
        <motion.h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Student Registration
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-gray-900">
          {["name", "mobile", "email", "father", "mother"].map((field) => (
            <motion.input
              key={field}
              whileHover="hover"
              variants={inputVariants}
              className="px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          ))}

          <div className="flex gap-4">
            <motion.select
              whileHover="hover"
              variants={inputVariants}
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="">Select Course</option>
              <option value="BCA">BCA</option>
              <option value="B.Tech">B.Tech</option>
            </motion.select>

            <motion.input
              whileHover="hover"
              variants={inputVariants}
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="px-3 py-2 rounded-xl text-gary-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex text-gray-700 items-center gap-6">
              {["Male", "Female"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                  />
                  <span className="text-sm">{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Student Photo</label>
            <input 
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full text-sm text-gray-700"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Branch</label>
          <div className="flex text-gray-700  flex-wrap gap-4">
            {["CSE", "IT", "ECE", "Civil"].map((b) => (
              <label key={b} className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.branches.includes(b)}
                  onChange={() => handleBranch(b)}
                />
                <span className="text-sm">{b}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            rows={4}
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="relative inline-flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg overflow-hidden"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => {
              if (ref && typeof ref.current?.resetForm === "function") ref.current.resetForm();
            }}
            className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition"
          >
            Reset
          </button>
        </div>
      </motion.form>
    </div>
  );
});

export default Form;
