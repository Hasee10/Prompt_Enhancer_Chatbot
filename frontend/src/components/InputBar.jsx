import React, { useState, useRef } from 'react';

export default function InputBar({ onSend, onImageUpload }) {
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() && !imageFile) return;
    onSend(input, imageFile);
    setInput('');
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
    e.target.value = '';
  };

  // Support pasting images from clipboard
  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        e.preventDefault();
        break;
      }
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <form className="flex items-center bg-white rounded-2xl shadow px-4 py-2 gap-4" onSubmit={handleSubmit} onPaste={handlePaste}>
      <label className="cursor-pointer flex items-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        {/* Image icon (SVG) */}
        <svg className="w-6 h-6 text-deep-green hover:text-olive transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
        </svg>
      </label>
      {/* Image preview thumbnail */}
      {imagePreview && (
        <div className="relative">
          <img src={imagePreview} alt="preview" className="w-12 h-12 object-cover rounded-xl border border-mint" />
          <button type="button" onClick={handleRemoveImage} className="absolute -top-2 -right-2 bg-peach text-deep-green rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-soft-orange">&times;</button>
        </div>
      )}
      <input
        type="text"
        placeholder={imageFile ? "Type a prompt for the image (optional)..." : "Type your message..."}
        className="flex-1 outline-none bg-transparent px-2 text-deep-green placeholder:text-olive"
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-peach text-deep-green rounded-2xl px-6 py-2 font-semibold hover:bg-soft-orange focus:ring-2 focus:ring-peach transition flex items-center gap-2"
        disabled={loading || (!input.trim() && !imageFile)}
      >
        {/* Send icon (SVG) */}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        Send
      </button>
    </form>
  );
} 