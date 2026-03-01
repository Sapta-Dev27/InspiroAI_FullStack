import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Eye, X, Copy, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';

import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import api from '../lib/api.js';

const BlogsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tags: '',
    tone: '',
    length: '',
  });

  const [blogs, setBlogs] = useState([]);
  const [generatedBlog, setGeneratedBlog] = useState(null);

  const blogRef = useRef(null);

  // FETCH USER BLOGS
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blog/user');
        setBlogs(response.data.blogs);
      } catch {
        alert("Error fetching blogs");
      }
    };
    fetchBlogs();
  }, []);

  // AUTO SCROLL TO GENERATED BLOG
  useEffect(() => {
    if (generatedBlog && blogRef.current) {
      blogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatedBlog]);

  // GENERATE BLOG
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/blog/create', {
        title: formData.title,
        category: formData.category,
        tags: formData.tags
          ? formData.tags.split(',').map(tag => tag.trim())
          : [],
        tone: formData.tone,
        length: formData.length,
      });

      const newBlog = response.data.newBlog;

      setBlogs(prev => [newBlog, ...prev]);
      setGeneratedBlog(newBlog);

      setFormData({
        title: "",
        category: "",
        tags: "",
        tone: "",
        length: "",
      });

      setShowForm(false);

    } catch {
      alert("Failed to create blog");
    }

    setLoading(false);
  };

  // DELETE
  const handleDelete = async (blogId) => {
    try {
      await api.delete(`/blog/delete/${blogId}`);
      setBlogs(prev => prev.filter(blog => blog._id !== blogId));
    } catch {
      alert("Delete failed");
    }
  };

  // DOWNLOAD PDF
  const handleDownloadPDF = (blog) => {
    const doc = new jsPDF();
    const text = doc.splitTextToSize(blog.blogContent, 180);
    doc.text(text, 10, 10);
    doc.save(`${blog.blogTitle}.pdf`);
  };

  const getWordCount = (text) =>
    text ? text.trim().split(/\s+/).length : 0;

  const categoryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'health', label: 'Health' },
    { value: 'finance', label: 'Finance' },
  ];

  const toneOptions = [
    { value: 'informative', label: 'Informative' },
    { value: 'casual', label: 'Casual' },
    { value: 'professional', label: 'Professional' },
    { value: 'persuasive', label: 'Persuasive' },
  ];

  const lengthOptions = [
    { value: '500', label: '500 words' },
    { value: '1000', label: '1000 words' },
    { value: '1500', label: '1500 words' },
    { value: '2000', label: '2000 words' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Explore Blogs</h1>
          <Button
            className="bg-blue-600 hover:bg-blue-700 w-64 flex justify-center"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={20} className="m-1 mr-2" />
            Generate Blog
          </Button>
        </div>

        {/* FORM */}
        {showForm && (
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">

              <Input
                label="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, title: e.target.value }))
                }
                required
              />

              <Select
                label="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, category: e.target.value }))
                }
                options={categoryOptions}
              />

              <Select
                label="Tone"
                value={formData.tone}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, tone: e.target.value }))
                }
                options={toneOptions}
              />

              <Select
                label="Length"
                value={formData.length}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, length: e.target.value }))
                }
                options={lengthOptions}
              />

              <Button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate Blog"}
              </Button>
            </form>
          </Card>
        )}

        {/* GENERATED PREVIEW SECTION */}
        {generatedBlog && (
          <motion.div
            ref={blogRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {generatedBlog.blogTitle}
                </h2>

                <div className="flex gap-2">
                  <Button size="sm"
                    onClick={() =>
                      navigator.clipboard.writeText(generatedBlog.blogContent)
                    }>
                    <Copy size={16} />
                  </Button>

                  <Button size="sm"
                    onClick={() => handleDownloadPDF(generatedBlog)}>
                    <Download size={16} />
                  </Button>
                </div>
              </div>

              <div className="prose max-w-none whitespace-pre-wrap">
                <ReactMarkdown>
                  {generatedBlog.blogContent}
                </ReactMarkdown>
              </div>
            </Card>
          </motion.div>
        )}

        {/* BLOG LIST */}
        <Card>
          <h2 className="text-xl font-bold mb-6">Your Blogs</h2>

          <div className="space-y-4">
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">
                  No blogs yet. Generate your first blog 🚀
                </p>
              </div>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <span>{blog.blogTitle}</span>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      <Eye size={16} />
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => handleDelete(blog._id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* POPUP MODAL */}
        {selectedBlog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">

              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4">
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold mb-2">
                {selectedBlog.blogTitle}
              </h2>

              <div className="flex gap-4 text-sm mb-4">
                <span>{selectedBlog.blogCateogory}</span>
                <span>{getWordCount(selectedBlog.blogContent)} words</span>
              </div>

              <div className="flex gap-3 mb-4">
                <Button size="sm"
                  onClick={() =>
                    navigator.clipboard.writeText(selectedBlog.blogContent)
                  }>
                  <Copy size={16} className="mr-2" />
                  Copy
                </Button>

                <Button size="sm"
                  onClick={() => handleDownloadPDF(selectedBlog)}>
                  Download PDF
                </Button>
              </div>

              <div className="prose max-w-none whitespace-pre-wrap">
                <ReactMarkdown>
                  {selectedBlog.blogContent}
                </ReactMarkdown>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default BlogsPage;