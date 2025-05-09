import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const NewAnnouncement: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'low'|'medium'|'high'>('low');
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ title, content, priority })
      });
      
    // Dispatch event to notify dashboard of new announcement
    window.dispatchEvent(new Event('announcementAdded'));

    nav('/announcements');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-xl font-bold">New Announcement</h1>
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
        onChange={e => setPriority(e.target.value as any)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default NewAnnouncement;
