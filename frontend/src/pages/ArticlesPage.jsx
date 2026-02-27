import { useState } from 'react';
import { Plus, Trash2, Eye } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';

const ArticlesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tags: '',
    tone: '',
    length: '',
  });

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'The Future of AI in Content Creation',
      category: 'Technology',
      date: '2024-01-15',
      length: '1500 words',
      tone: 'Professional',
    },
    {
      id: 2,
      title: 'Top 10 Marketing Strategies for 2024',
      category: 'Marketing',
      date: '2024-01-14',
      length: '2000 words',
      tone: 'Informative',
    },
    {
      id: 3,
      title: 'How to Build a Successful SaaS Product',
      category: 'Business',
      date: '2024-01-13',
      length: '1800 words',
      tone: 'Professional',
    },
  ]);

  const categoryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'health', label: 'Health' },
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'informative', label: 'Informative' },
    { value: 'persuasive', label: 'Persuasive' },
    { value: 'friendly', label: 'Friendly' },
  ];

  const lengthOptions = [
    { value: '500', label: '500 words' },
    { value: '1000', label: '1000 words' },
    { value: '1500', label: '1500 words' },
    { value: '2000', label: '2000 words' },
    { value: '2500', label: '2500 words' },
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
      const newArticle = {
        id: articles.length + 1,
        title: formData.title,
        category: formData.category,
        date: new Date().toISOString().split('T')[0],
        length: `${formData.length} words`,
        tone: formData.tone,
      };
      setArticles([newArticle, ...articles]);
      setFormData({
        title: '',
        category: '',
        tags: '',
        tone: '',
        length: '',
      });
      setShowForm(false);
      setLoading(false);
    }, 2000);
  };

  const handleDelete = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
            <p className="text-gray-600 mt-1">Generate and manage your AI articles</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus size={20} className="mr-2" />
            Generate Article
          </Button>
        </div>

        {showForm && (
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Generate New Article</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter article title"
                required
              />

              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions}
                required
              />

              <Input
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., AI, technology, innovation"
              />

              <Select
                label="Tone"
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                options={toneOptions}
                required
              />

              <Select
                label="Length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                options={lengthOptions}
                required
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Generating...' : 'Generate Article'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Articles</h2>
          <div className="space-y-4">
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No articles yet. Generate your first article!</p>
              </div>
            ) : (
              articles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <span>{article.length}</span>
                      <span>{article.tone}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ArticlesPage;
