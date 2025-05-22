// src/components/NewAnnouncement.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const NewAnnouncement: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('societyToken');
      if (!token) throw new Error('No token found');
      const apiBase = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api';
      console.log('Submitting to:', `${apiBase}/announcements`);
      console.log('Payload:', { title, content, priority });
      const response = await fetch(`${apiBase}/announcements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, priority }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }
      const data = await response.json();
      console.log('Response:', data);
      window.dispatchEvent(new Event('announcementAdded'));
      alert('Announcement created successfully');
      nav('/announcements');
    } catch (err: any) {
      console.error('Failed to create announcement:', err);
      setError(err.message || 'Failed to create announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-xl font-bold">New Announcement</h1>
      {error && <p className="text-red-600">{error}</p>}
      <Input
        required
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        required
        className="w-full border p-2"
        placeholder="Description"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <select
        className="w-full border p-2"
        value={priority}
        onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default NewAnnouncement;