import { useState } from 'react';
import { Download } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const ThumbnailGeneratorPage = () => {
  const [loading, setLoading] = useState(false);
  const [generatedThumbnail, setGeneratedThumbnail] = useState(null);
  const [formData, setFormData] = useState({
    topic: '',
    style: '',
    colorScheme: '',
    addText: true,
  });

  const [thumbnails, setThumbnails] = useState([
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=600',
      topic: 'Tech Review',
      style: 'YouTube',
      date: '2024-01-15',
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=600',
      topic: 'Gaming Tournament',
      style: 'Gaming',
      date: '2024-01-14',
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      topic: 'Business Tips',
      style: 'Business',
      date: '2024-01-13',
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
      topic: 'Psychology Facts',
      style: 'Psychology',
      date: '2024-01-12',
    },
  ]);

  const styleOptions = [
    { value: 'youtube', label: 'YouTube' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'tech', label: 'Tech' },
    { value: 'education', label: 'Education' },
    { value: 'business', label: 'Business' },
    { value: 'sports', label: 'Sports' },
    { value: 'cars', label: 'Cars' },
    { value: 'romance', label: 'Romance' },
    { value: 'psychology', label: 'Psychology' },
  ];

  const colorSchemeOptions = [
    { value: 'vibrant', label: 'Vibrant' },
    { value: 'dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'neon', label: 'Neon' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'monochrome', label: 'Monochrome' },
  ];

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newThumbnail = {
        id: thumbnails.length + 1,
        url: 'https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg?auto=compress&cs=tinysrgb&w=600',
        topic: formData.topic,
        style: formData.style,
        date: new Date().toISOString().split('T')[0],
      };

      setGeneratedThumbnail(newThumbnail);
      setThumbnails([newThumbnail, ...thumbnails]);
      setLoading(false);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thumbnail Generator</h1>
          <p className="text-gray-600 mt-1">Create eye-catching thumbnails for your content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Generate Thumbnail</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="e.g., How to Build a Website"
                required
              />

              <Select
                label="Style"
                name="style"
                value={formData.style}
                onChange={handleChange}
                options={styleOptions}
                required
              />

              <Select
                label="Color Scheme"
                name="colorScheme"
                value={formData.colorScheme}
                onChange={handleChange}
                options={colorSchemeOptions}
                required
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="addText"
                  name="addText"
                  checked={formData.addText}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="addText" className="ml-2 text-sm font-medium text-gray-700">
                  Add Text on Thumbnail
                </label>
              </div>

              <Button type="submit" disabled={loading} fullWidth>
                {loading ? 'Generating Thumbnail...' : 'Generate Thumbnail'}
              </Button>
            </form>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Preview</h2>
            {loading ? (
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Generating your thumbnail...</p>
                </div>
              </div>
            ) : generatedThumbnail ? (
              <div>
                <img
                  src={generatedThumbnail.url}
                  alt={generatedThumbnail.topic}
                  className="w-full h-64 object-cover rounded-lg border border-gray-200 mb-4"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{generatedThumbnail.topic}</p>
                    <p className="text-sm text-gray-600">{generatedThumbnail.style}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => window.open(generatedThumbnail.url, '_blank')}
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500">Your generated thumbnail will appear here</p>
              </div>
            )}
          </Card>
        </div>

        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Thumbnails</h2>
          {thumbnails.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No thumbnails generated yet. Create your first thumbnail!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {thumbnails.map((thumbnail) => (
                <div key={thumbnail.id} className="group relative">
                  <div className="relative overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={thumbnail.url}
                      alt={thumbnail.topic}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(thumbnail.url, '_blank')}
                      >
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{thumbnail.topic}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {thumbnail.style}
                      </span>
                      <span className="text-xs text-gray-500">{thumbnail.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ThumbnailGeneratorPage;
