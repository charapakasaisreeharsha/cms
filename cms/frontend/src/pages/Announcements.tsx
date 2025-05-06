import React, { useState, useEffect, ChangeEvent } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useNavigate } from 'react-router-dom';
import { Bell, Megaphone, Edit, Trash2 } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string | null; // allow null from API
  priority: 'low' | 'medium' | 'high';
}

const Announcements: React.FC = () => {
  const nav = useNavigate();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/announcements');
        const data: Announcement[] = await res.json();
        setAnnouncements(data);
      } catch (err) {
        console.error('Failed to load announcements', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Apply filters
  const filteredAnnouncements = announcements.filter((a) => {
    // Search filter
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase())
      || a.content.toLowerCase().includes(searchTerm.toLowerCase());

    // Priority filter
    const matchesPriority = filterPriority ? a.priority === filterPriority : true;

    // Date filter (guard against null)
    const dateValue = a.date ?? '';
    const matchesDate = filterDate ? dateValue.startsWith(filterDate) : true;

    return matchesSearch && matchesPriority && matchesDate;
  });

  if (loading) {
    return <p className="p-6">Loading announcements...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
        <Button onClick={() => nav('/announcements/new')}>
          <Megaphone className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <h2 className="font-semibold mb-4">Filter Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={filterPriority}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterPriority(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Input
              type="date"
              placeholder="Date"
              value={filterDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterDate(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold mr-2">{announcement.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{announcement.content}</p>
                    <p className="text-sm text-gray-500">Posted on: {announcement.date ? new Date(announcement.date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No announcements match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Announcements;