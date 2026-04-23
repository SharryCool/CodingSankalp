"use client";

import { useEffect, useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Delete02Icon,
  Image01Icon,
  PencilEdit02Icon,
  Search01Icon,
  BookOpen01Icon,
  UserIcon,
  ArrowDown01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
} from "@hugeicons-pro/core-stroke-rounded";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";

type BlogContentItem = {
  headline: string;
  description: string;
};

type BlogItem = {
  _id: string;
  admin_id: string;
  image: string;
  title: string;
  author: string;
  content: BlogContentItem[];
  date?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

export default function DashboardBlogsPage() {
  const [mounted, setMounted] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [fetchingBlogs, setFetchingBlogs] = useState(false);
  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState<BlogContentItem[]>([
    { headline: "", description: "" },
  ]);
  const [file, setFile] = useState<File | null>(null);

  const [deleteId, setDeleteId] = useState("");
const router = useRouter();
  useEffect(() => {
    setMounted(true);
    const token = sessionStorage.getItem("authToken");
    setAuthToken(token);

    if (token) {
      fetchAllBlogs(token);
    }
    else{

        router.push("/dashboard/login")
    }
  }, []);

  const showMessage = (text: string, type: boolean) => {
    setMessage(text);
    setSuccess(type);

    setTimeout(() => {
      setMessage("");
      setSuccess(null);
    }, 3000);
  };

  const resetCreateForm = () => {
    setTitle("");
    setAuthor("");
    setContent([{ headline: "", description: "" }]);
    setFile(null);

    const fileInput = document.getElementById(
      "blog-file-input"
    ) as HTMLInputElement | null;

    if (fileInput) fileInput.value = "";
  };

  const addContentBlock = () => {
    setContent((prev) => [...prev, { headline: "", description: "" }]);
  };

  const removeContentBlock = (index: number) => {
    setContent((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const updateContentBlock = (
    index: number,
    field: keyof BlogContentItem,
    value: string
  ) => {
    setContent((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const validateCreateForm = () => {
    if (!title.trim()) return "Title is required";
    if (!author.trim()) return "Author is required";
    if (!file) return "Blog image file is required";

    for (const item of content) {
      if (!item.headline.trim()) return "All headlines are required";
      if (!item.description.trim()) return "All descriptions are required";
    }

    return null;
  };

  const fetchAllBlogs = async (tokenParam?: string) => {
    const tokenToUse = tokenParam || authToken;

    if (!tokenToUse) {
      showMessage("Please login first", false);
      return;
    }

    try {
      setFetchingBlogs(true);

      const response = await fetch(`${API_BASE}/api/blog/fetch-all-publication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: tokenToUse,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        showMessage(data.message || "Failed to fetch blogs", false);
        setBlogs([]);
        return;
      }

      setBlogs(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      showMessage("Something went wrong while fetching blogs", false);
    } finally {
      setFetchingBlogs(false);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authToken) {
      showMessage("Please login first", false);
      return;
    }

    const validationMessage = validateCreateForm();
    if (validationMessage) {
      showMessage(validationMessage, false);
      return;
    }

    try {
      setCreateLoading(true);

      const formData = new FormData();
      formData.append("image", "blog-image");
      formData.append("title", title);
      formData.append("author", author);
      formData.append("content", JSON.stringify(content));

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(`${API_BASE}/api/blog/create-new-blog`, {
        method: "POST",
        headers: {
          token: authToken,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        showMessage(data.message || "Failed to create blog", false);
        return;
      }

      showMessage(data.message || "Blog created successfully", true);
      resetCreateForm();
      fetchAllBlogs();
    } catch (error) {
      showMessage("Something went wrong while creating blog", false);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteBlog = async (id?: string) => {
    const finalId = id || deleteId;

    if (!authToken) {
      showMessage("Please login first", false);
      return;
    }

    if (!finalId.trim()) {
      showMessage("Blog id is required", false);
      return;
    }

    try {
      setDeleteLoading(true);

      const response = await fetch(`${API_BASE}/api/blog/delete-publication`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: authToken,
        },
        body: JSON.stringify({ _id: finalId }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        showMessage(data.message || "Failed to delete blog", false);
        return;
      }

      showMessage(data.message || "Blog deleted successfully", true);
      setDeleteId("");
      setBlogs((prev) => prev.filter((item) => item._id !== finalId));
    } catch (error) {
      showMessage("Something went wrong while deleting blog", false);
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredBlogs = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return blogs;

    return blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(q) ||
        blog.author.toLowerCase().includes(q) ||
        blog.content.some(
          (item) =>
            item.headline.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        )
      );
    });
  }, [blogs, search]);

  return (

    <>
   
    <DashboardNavbar/>
    <section className="space-y-8">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2">
              <HugeiconsIcon
                icon={BookOpen01Icon}
                size={18}
                strokeWidth={1.8}
                className="text-cyan-300"
              />
              <span className="text-sm font-medium text-cyan-100">
                Blog Management
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Professional Blog Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Create, search, and delete blog records from your admin panel.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Total Blogs
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {blogs.length}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Visible Results
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {filteredBlogs.length}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Auth Status
              </p>
              <h3 className="mt-2 text-base font-semibold text-cyan-200">
                {mounted ? (authToken ? "Logged In" : "Not Logged In") : "Checking..."}
              </h3>
            </div>
          </div>
        </div>

        {message ? (
          <div
            className={`mt-6 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
              success
                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                : "border-red-400/20 bg-red-500/10 text-red-200"
            }`}
          >
            <HugeiconsIcon
              icon={success ? CheckmarkCircle02Icon : Alert02Icon}
              size={20}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0"
            />
            <span>{message}</span>
          </div>
        ) : null}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10">
                <HugeiconsIcon
                  icon={Add01Icon}
                  size={22}
                  strokeWidth={1.8}
                  className="text-cyan-300"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Create New Blog
                </h2>
                <p className="text-sm text-slate-400">
                  Add image, title, author, and multiple content sections.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Blog Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Author Name
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 focus-within:border-cyan-400/40">
                    <HugeiconsIcon
                      icon={UserIcon}
                      size={18}
                      strokeWidth={1.8}
                      className="text-slate-400"
                    />
                    <input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Enter author name"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Blog Image
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-4 transition hover:border-cyan-400/30 hover:bg-white/[0.05]">
                  <HugeiconsIcon
                    icon={Image01Icon}
                    size={20}
                    strokeWidth={1.8}
                    className="text-cyan-300"
                  />
                  <span className="text-sm text-slate-300">
                    {file ? file.name : "Choose blog image file"}
                  </span>
                  <input
                    id="blog-file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0] || null;
                      setFile(selectedFile);
                    }}
                  />
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Blog Content Sections
                    </h3>
                    <p className="text-sm text-slate-400">
                      Add one or more headline and description blocks.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addContentBlock}
                    className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:border-cyan-400/40 hover:bg-cyan-500/20"
                  >
                    <HugeiconsIcon
                      icon={Add01Icon}
                      size={18}
                      strokeWidth={1.8}
                    />
                    Add Section
                  </button>
                </div>

                {content.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h4 className="text-sm font-semibold text-cyan-200">
                        Section {index + 1}
                      </h4>

                      {content.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeContentBlock(index)}
                          className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition hover:bg-red-500/20"
                        >
                          <HugeiconsIcon
                            icon={Cancel01Icon}
                            size={16}
                            strokeWidth={1.8}
                          />
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Headline
                        </label>
                        <input
                          value={item.headline}
                          onChange={(e) =>
                            updateContentBlock(index, "headline", e.target.value)
                          }
                          placeholder="Enter section headline"
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                          Description
                        </label>
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            updateContentBlock(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={5}
                          placeholder="Enter section description"
                          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={createLoading}
                  className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/15 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-400/40 hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <HugeiconsIcon
                    icon={Add01Icon}
                    size={18}
                    strokeWidth={1.8}
                  />
                  {createLoading ? "Creating..." : "Create Blog"}
                </button>

                <button
                  type="button"
                  onClick={resetCreateForm}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]"
                >
                  <HugeiconsIcon
                    icon={PencilEdit02Icon}
                    size={18}
                    strokeWidth={1.8}
                  />
                  Reset Form
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
                <HugeiconsIcon
                  icon={Delete02Icon}
                  size={22}
                  strokeWidth={1.8}
                  className="text-red-300"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Delete Blog</h2>
                <p className="text-sm text-slate-400">
                  Delete any blog by entering its MongoDB id.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <input
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                placeholder="Enter blog _id"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-red-400/40"
              />

              <button
                type="button"
                onClick={() => handleDeleteBlog()}
                disabled={deleteLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-100 transition hover:border-red-400/40 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <HugeiconsIcon
                  icon={Delete02Icon}
                  size={18}
                  strokeWidth={1.8}
                />
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">All Blogs</h2>
              <p className="text-sm text-slate-400">
                Search and manage created blog records.
              </p>
            </div>

            <button
              type="button"
              onClick={() => fetchAllBlogs()}
              disabled={fetchingBlogs}
              className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:border-cyan-400/40 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={18}
                strokeWidth={1.8}
              />
              {fetchingBlogs ? "Refreshing..." : "Refresh Blogs"}
            </button>
          </div>

          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <HugeiconsIcon
              icon={Search01Icon}
              size={18}
              strokeWidth={1.8}
              className="text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, headline, or description"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-4">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {blog.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          By {blog.author}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100 transition hover:bg-red-500/20"
                      >
                        <HugeiconsIcon
                          icon={Delete02Icon}
                          size={16}
                          strokeWidth={1.8}
                        />
                        Delete
                      </button>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                      <p className="break-all text-xs leading-6 text-slate-400">
                        <span className="font-semibold text-cyan-200">ID:</span>{" "}
                        {blog._id}
                      </p>
                    </div>

                    <div className="mt-4 space-y-3">
                      {blog.content?.slice(0, 2).map((item, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                        >
                          <h4 className="text-sm font-semibold text-cyan-200">
                            {item.headline}
                          </h4>
                          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                            {item.description}
                          </p>
                        </div>
                      ))}

                      {blog.content?.length > 2 ? (
                        <p className="text-xs text-slate-400">
                          +{blog.content.length - 2} more section(s)
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
                <h3 className="text-lg font-semibold text-white">
                  No blogs found
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Create a new blog or refresh the list.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section> 
    </>
  );
}