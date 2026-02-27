import { FileText, BookOpen, Image, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: FileText,
      label: 'Total Articles',
      value: '24',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: BookOpen,
      label: 'Total Blogs',
      value: '18',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Image,
      label: 'Total Images',
      value: '56',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Layers,
      label: 'Total Thumbnails',
      value: '32',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  const recentArticles = [
    {
      id: 1,
      title: 'The Future of AI in Content Creation',
      category: 'Technology',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Top 10 Marketing Strategies for 2024',
      category: 'Marketing',
      date: '2024-01-14',
    },
    {
      id: 3,
      title: 'How to Build a Successful SaaS Product',
      category: 'Business',
      date: '2024-01-13',
    },
  ];

  const recentBlogs = [
    {
      id: 1,
      title: 'Getting Started with Machine Learning',
      category: 'Technology',
      date: '2024-01-15',
    },
    {
      id: 2,
      title: 'Best Practices for Remote Work',
      category: 'Productivity',
      date: '2024-01-14',
    },
  ];

  const recentImages = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300',
      prompt: 'Futuristic cityscape at sunset',
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=300',
      prompt: 'Abstract geometric patterns',
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&w=300',
      prompt: 'Mountain landscape with lake',
    },
  ];

  const recentThumbnails = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=300',
      style: 'YouTube',
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=300',
      style: 'Gaming',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your content today.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Articles</h2>
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{article.title}</h3>
                    <p className="text-sm text-gray-600">{article.category}</p>
                  </div>
                  <p className="text-sm text-gray-500">{article.date}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Blogs</h2>
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{blog.title}</h3>
                    <p className="text-sm text-gray-600">{blog.category}</p>
                  </div>
                  <p className="text-sm text-gray-500">{blog.date}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Images</h2>
            <div className="grid grid-cols-3 gap-4">
              {recentImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <p className="text-white text-xs text-center px-2">{image.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Thumbnails</h2>
            <div className="grid grid-cols-2 gap-4">
              {recentThumbnails.map((thumb) => (
                <div key={thumb.id} className="relative group">
                  <img
                    src={thumb.url}
                    alt={thumb.style}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {thumb.style}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
