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

const ArticlesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tags: '',
    tone: '',
    length: '',
  });

  const [articles, setArticles] = useState([]);
  const [generatedArticle, setGeneratedArticle] = useState(null);

  const articleRef = useRef(null);

  // FETCH USER ARTICLES
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/article/user');
        setArticles(response.data.articles);
      } catch {
        alert("Error fetching articles");
      }
    };
    fetchArticles();
  }, []);

  // AUTO SCROLL TO GENERATED ARTICLE
  useEffect(() => {
    if (generatedArticle && articleRef.current) {
      articleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatedArticle]);

  // GENERATE ARTICLE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/article/create", {
        title: formData.title,
        category: formData.category,
        tags: formData.tags
          ? formData.tags.split(",").map(tag => tag.trim())
          : [],
        tone: formData.tone,
        length: formData.length,
      });

      const newArticle = response.data.article;

      setArticles(prev => [newArticle, ...prev]);
      setGeneratedArticle(newArticle);

      setFormData({
        title: "",
        category: "",
        tags: "",
        tone: "",
        length: "",
      });

      setShowForm(false);

    } catch {
      alert("Failed to create article");
    }

    setLoading(false);
  };

  // DELETE
  const handleDelete = async (articleId) => {
    try {
      await api.delete(`/article/delete/${articleId}`);
      setArticles(prev => prev.filter(article => article._id !== articleId));
    } catch {
      alert("Delete failed");
    }
  };

  // DOWNLOAD PDF
  const handleDownloadPDF = (article) => {
    const doc = new jsPDF();
    const text = doc.splitTextToSize(article.content, 180);
    doc.text(text, 10, 10);
    doc.save(`${article.title}.pdf`);
  };

  const getWordCount = (text) =>
    text ? text.trim().split(/\s+/).length : 0;

  const categoryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' },
    { value: 'sports', label: 'Sports' },
    { value: 'health', label: 'Health' },
    { value: 'entertainment', label: 'Entertainment' },

  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'informative', label: 'Informative' },
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
          <h1 className="text-3xl font-bold">Explore Articles</h1>
          <Button className='bg-blue-600 hover:bg-blue-700 w-64 flex justify-center' onClick={() => setShowForm(!showForm)}>
            <Plus size={20} className="m-1 mr-2" />
            Generate Article
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
                {loading ? "Generating..." : "Generate Article"}
              </Button>
            </form>
          </Card>
        )}

        {/* GENERATED PREVIEW SECTION */}
        {generatedArticle && (
          <motion.div
            ref={articleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {generatedArticle.title}
                </h2>

                <div className="flex gap-2">
                  <Button size="sm"
                    onClick={() =>
                      navigator.clipboard.writeText(generatedArticle.content)
                    }>
                    <Copy size={16} />
                  </Button>

                  <Button size="sm"
                    onClick={() => handleDownloadPDF(generatedArticle)}>
                    <Download size={16} />
                  </Button>
                </div>
              </div>

              <div className="prose max-w-none whitespace-pre-wrap">
                <ReactMarkdown>
                  {generatedArticle.content}
                </ReactMarkdown>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ARTICLE LIST */}
        <Card>
          <h2 className="text-xl font-bold mb-6">Your Articles</h2>

          <div className="space-y-4">
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">
                  No articles yet. Generate your first article 🚀
                </p>
              </div>
            ) : (
              articles.map((article) => (
                <div
                  key={article._id}
                  className="flex justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <span>{article.title}</span>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <Eye size={16} />
                    </Button>

                    <Button
                      size="sm"
                      onClick={() => handleDelete(article._id)}
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
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">

              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4">
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold mb-2">
                {selectedArticle.title}
              </h2>

              <div className="flex gap-4 text-sm mb-4">
                <span>{selectedArticle.cateogory}</span>
                <span>{selectedArticle.tone}</span>
                <span>{getWordCount(selectedArticle.content)} words</span>
              </div>

              <div className="flex gap-3 mb-4">
                <Button size="sm"
                  onClick={() =>
                    navigator.clipboard.writeText(selectedArticle.content)
                  }>
                  <Copy size={16} className="mr-2" />
                  Copy
                </Button>

                <Button size="sm"
                  onClick={() => handleDownloadPDF(selectedArticle)}>
                  Download PDF
                </Button>
              </div>

              <div className="prose max-w-none whitespace-pre-wrap">
                <ReactMarkdown>
                  {selectedArticle.content}
                </ReactMarkdown>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default ArticlesPage;