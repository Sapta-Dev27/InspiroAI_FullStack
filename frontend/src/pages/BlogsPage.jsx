import { useState } from 'react';
import { Plus, Trash2, Eye } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';

const BlogsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
  });

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Getting Started with Machine Learning',
      category: 'Technology',
      date: '2024-01-15',
      excerpt: 'Learn the basics of machine learning and how to get started...',
    },
    {
      id: 2,
      title: 'Best Practices for Remote Work',
      category: 'Productivity',
      date: '2024-01-14',
      excerpt: 'Discover effective strategies for working remotely...',
    },
    {
      id: 3,
      title: 'Healthy Eating on a Budget',
      category: 'Lifestyle',
      date: '2024-01-13',
      excerpt: 'Tips and tricks for eating healthy without breaking the bank...',
    },
  ]);

  const categoryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'health', label: 'Health' },
    { value: 'finance', label: 'Finance' },
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
      const newBlog = {
        id: blogs.length + 1,
        title: formData.title,
        category: formData.category,
        date: new Date().toISOString().split('T')[0],
        excerpt: formData.description,
      };
      setBlogs([newBlog, ...blogs]);
      setFormData({
        title: '',
        category: '',
        description: '',
      });
      setShowForm(false);
      setLoading(false);
    }, 2000);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
            <p className="text-gray-600 mt-1">Generate and manage your AI blog posts</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus size={20} className="mr-2" />
            Generate Blog
          </Button>
        </div>

        {showForm && (
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Generate New Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
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

              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the blog post"
                rows={4}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Generating...' : 'Generate Blog'}
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Blog Posts</h2>
          <div className="space-y-4">
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No blog posts yet. Generate your first blog!</p>
              </div>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {blog.category}
                      </span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button size="sm" variant="ghost">
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(blog.id)}
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

export default BlogsPage;
