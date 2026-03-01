import { useState, useEffect } from "react";
import { Download, Trash2 } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Textarea from "../components/ui/Textarea";
import Select from "../components/ui/Select";
import api from "../lib/api.js";

const ImageGeneratorPage = () => {
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);

  // 🔥 NEW STATES FOR PREVIEW
  const [previewImage, setPreviewImage] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [formData, setFormData] = useState({
    prompt: "",
    style: "realistic",
    aspectRatio: "1:1",
  });

  const styleOptions = [
    { value: "realistic", label: "Realistic" },
    { value: "artistic", label: "Artistic" },
    { value: "abstract", label: "Abstract" },
    { value: "minimalist", label: "Minimalist" },
    { value: "vintage", label: "Vintage" },
    { value: "3d", label: "3D Render" },
  ];

  const aspectRatioOptions = [
    { value: "1:1", label: "Square (1:1)" },
    { value: "16:9", label: "Landscape (16:9)" },
    { value: "9:16", label: "Portrait (9:16)" },
    { value: "4:3", label: "Standard (4:3)" },
  ];

  // 🔥 Fetch User Images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get("/image/user");

        const formatted = response.data.images.map((img) => ({
          id: img._id,
          url: img.imageURL,
          prompt: img.imagePrompt,
          date: new Date(img.createdAt)
            .toISOString()
            .split("T")[0],
        }));

        setGeneratedImages(formatted);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    fetchImages();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔥 Generate Image
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.prompt) {
      return alert("Prompt is required");
    }

    try {
      setLoading(true);

      // 🔥 PREVIEW STARTS
      setPreviewLoading(true);
      setPreviewImage(null);

      const response = await api.post("/image/generate", formData);

      const newImage = {
        id: response.data.data._id,
        url: response.data.data.imageURL,
        prompt: response.data.data.imagePrompt,
        date: new Date(response.data.data.createdAt)
          .toISOString()
          .split("T")[0],
      };

      setGeneratedImages((prev) => [newImage, ...prev]);

      // 🔥 SET PREVIEW IMAGE
      setPreviewImage(newImage.url);

      setFormData({
        prompt: "",
        style: "realistic",
        aspectRatio: "1:1",
      });

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Image generation failed");
    } finally {
      setLoading(false);
      setPreviewLoading(false);
    }
  };

  // 🔥 Delete Image
  const handleDelete = async (id) => {
    try {
      await api.delete(`/image/delete/${id}`);

      setGeneratedImages((prev) =>
        prev.filter((img) => img.id !== id)
      );
    } catch (error) {
      alert("Failed to delete image");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Image Generator
          </h1>
          <p className="text-gray-600 mt-1">
            Create stunning AI images
          </p>
        </div>

        {/* 🔥 Generate Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold mb-6">
              Generate Image
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Textarea
                label="Prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                placeholder="Describe the image..."
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
                />

                <Select
                  label="Aspect Ratio"
                  value={formData.aspectRatio}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, aspectRatio: e.target.value }))
                  }
                  options={aspectRatioOptions}
                />
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate Image"}
              </Button>
            </form>
          </Card>

          {/* 🔥 LIVE PREVIEW */}
          <Card>
            <h2 className="text-xl font-bold mb-6">
              Preview
            </h2>

            <div className="w-full h-72 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">

              {previewLoading ? (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-sm">
                    We are Generating image based on your prompt, please wait a moment...
                  </p>
                </div>
              ) : previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-gray-400">
                  Your generated image preview will appear here
                </p>
              )}

            </div>
          </Card>
        </div>


        {/* 🔥 Image Grid */}
        <Card>
          <h2 className="text-xl font-bold mb-6">
            Your Generated Images
          </h2>

          {generatedImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No images generated yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((image) => (
                <div key={image.id} className="group relative">
                  <div className="relative overflow-hidden rounded-lg border">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-64 object-cover"
                    />

                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center space-x-3">

                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition"
                        onClick={() =>
                          window.open(image.url, "_blank")
                        }
                      >
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        className="opacity-0 group-hover:opacity-100 transition"
                        onClick={() =>
                          handleDelete(image.id)
                        }
                      >
                        <Trash2 size={16} />
                      </Button>

                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium truncate">
                      {image.prompt}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {image.date}
                    </p>
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