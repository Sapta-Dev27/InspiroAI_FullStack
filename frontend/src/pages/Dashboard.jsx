import { useEffect, useState } from "react";
import { FileText, BookOpen, Image, Layers } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import api from "../lib/api";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [recentArticles, setRecentArticles] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentImages, setRecentImages] = useState([]);
  const [recentThumbnails, setRecentThumbnails] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [
          statsRes,
          articlesRes,
          blogsRes,
          imagesRes,
          thumbnailsRes,
        ] = await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/recentArticles"),
          api.get("/dashboard/recentBlogs"),
          api.get("/dashboard/recentImages"),
          api.get("/dashboard/recentThumbnails"),
        ]);

        setStats(statsRes.data.data);
        setRecentArticles(articlesRes.data.data);
        setRecentBlogs(blogsRes.data.data);
        setRecentImages(imagesRes.data.data);
        setRecentThumbnails(thumbnailsRes.data.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-gray-500">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  const statsData = [
    {
      icon: FileText,
      label: "Total Articles",
      value: stats?.noOfArticles || 0,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: BookOpen,
      label: "Total Blogs",
      value: stats?.noOfBlogs || 0,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Image,
      label: "Total Images",
      value: stats?.noOfImages || 0,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Layers,
      label: "Total Thumbnails",
      value: stats?.noOfThumbnails || 0,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your content today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}
                  >
                    <Icon size={24} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Articles + Blogs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Articles
            </h2>
            <div className="space-y-4">
              {recentArticles.length === 0 ? (
                <p className="text-gray-500">No recent articles</p>
              ) : (
                recentArticles.map((article) => (
                  <div
                    key={article._id}
                    className="flex items-center justify-between p-4 bg-green-100 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {article.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(article.createdAt)
                        .toISOString()
                        .split("T")[0]}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Blogs
            </h2>
            <div className="space-y-4">
              {recentBlogs.length === 0 ? (
                <p className="text-gray-500">No recent blogs</p>
              ) : (
                recentBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="flex items-center justify-between p-4 bg-blue-100 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {blog.blogTitle}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(blog.createdAt)
                        .toISOString()
                        .split("T")[0]}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Images + Thumbnails */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Images
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {recentImages.map((image) => (
                <div key={image._id} className="relative group">
                  <img
                    src={image.imageURL}
                    alt={image.imagePrompt}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Thumbnails
            </h2>
            {recentThumbnails.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No recent thumbnails</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {recentThumbnails.map((thumb) => (
                  <div key={thumb._id} className="relative group">
                    <img
                      src={thumb.thumbnailUrl}
                      alt={thumb.topic}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;