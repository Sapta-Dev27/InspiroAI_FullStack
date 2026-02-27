import { useState } from 'react';
import { Download } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';

const ImageGeneratorPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    prompt: '',
    style: '',
    aspectRatio: '',
  });

  const [generatedImages, setGeneratedImages] = useState([
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
      prompt: 'Futuristic cityscape at sunset',
      date: '2024-01-15',
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=600',
      prompt: 'Abstract geometric patterns',
      date: '2024-01-14',
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&w=600',
      prompt: 'Mountain landscape with lake',
      date: '2024-01-13',
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=600',
      prompt: 'Minimalist modern architecture',
      date: '2024-01-12',
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=600',
      prompt: 'Colorful underwater scene',
      date: '2024-01-11',
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=600',
      prompt: 'Space exploration concept',
      date: '2024-01-10',
    },
  ]);

  const styleOptions = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'vintage', label: 'Vintage' },
    { value: '3d', label: '3D Render' },
  ];

  const aspectRatioOptions = [
    { value: '1:1', label: 'Square (1:1)' },
    { value: '16:9', label: 'Landscape (16:9)' },
    { value: '9:16', label: 'Portrait (9:16)' },
    { value: '4:3', label: 'Standard (4:3)' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newImage = {
        id: generatedImages.length + 1,
        url: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=600',
        prompt: formData.prompt,
        date: new Date().toISOString().split('T')[0],
      };
      setGeneratedImages([newImage, ...generatedImages]);
      setFormData({
        prompt: '',
        style: formData.style,
        aspectRatio: formData.aspectRatio,
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Image Generator</h1>
          <p className="text-gray-600 mt-1">Create stunning images with AI</p>
        </div>

        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Generate Image</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
              label="Prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              placeholder="Describe the image you want to generate..."
              rows={4}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Style"
                name="style"
                value={formData.style}
                onChange={handleChange}
                options={styleOptions}
                required
              />

              <Select
                label="Aspect Ratio"
                name="aspectRatio"
                value={formData.aspectRatio}
                onChange={handleChange}
                options={aspectRatioOptions}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Generating Image...' : 'Generate Image'}
            </Button>
          </form>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Generated Images</h2>
          {generatedImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No images generated yet. Create your first image!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((image) => (
                <div key={image.id} className="group relative">
                  <div className="relative overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(image.url, '_blank')}
                      >
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{image.prompt}</p>
                    <p className="text-xs text-gray-500 mt-1">{image.date}</p>
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

export default ImageGeneratorPage;
