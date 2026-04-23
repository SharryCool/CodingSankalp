// app/dashboard/contacts/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ContactBookIcon,
  Search01Icon,
  ArrowDown01Icon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  Mail01Icon,
  Call02Icon,
  Message01Icon,
  ViewIcon,
} from "@hugeicons-pro/core-stroke-rounded";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";

type ContactItem = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

export default function DashboardContactsPage() {
  const [mounted, setMounted] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
    null
  );

  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);

  const [fetchingContacts, setFetchingContacts] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);
  
    const router=useRouter();
    useEffect(()=>{
  
      const token = sessionStorage.getItem("authToken");
      if(!token){
          router.push("/dashboard/login")
      }
    },[])

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("authToken");
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      handleFetchContacts(true);
    }
  }, [authToken]);

  const showMessage = (text: string, type: boolean) => {
    setMessage(text);
    setSuccess(type);

    setTimeout(() => {
      setMessage("");
      setSuccess(null);
    }, 3000);
  };

  const handleFetchContacts = async (reset = false) => {
    if (!authToken) {
      showMessage("Please login first", false);
      return;
    }

    const currentSkip = reset ? 0 : skip;

    try {
      if (reset) {
        setFetchingContacts(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(`${API_BASE}/api/contact/fetch-all-contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: authToken,
        },
        body: JSON.stringify({
          search: search.trim(),
          skip: currentSkip,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        showMessage(data.message || "Failed to fetch contacts", false);
        if (reset) {
          setContacts([]);
        }
        return;
      }

      const fetchedContacts: ContactItem[] = Array.isArray(data.data)
        ? data.data
        : [];

      if (reset) {
        setContacts(fetchedContacts);
        setSkip(fetchedContacts.length);
        setSelectedContact(fetchedContacts[0] || null);
      } else {
        setContacts((prev) => [...prev, ...fetchedContacts]);
        setSkip((prev) => prev + fetchedContacts.length);
      }

      if (fetchedContacts.length === 0 && !reset) {
        showMessage("No more contacts found", false);
      }
    } catch (error) {
      showMessage("Something went wrong while fetching contacts", false);
    } finally {
      setFetchingContacts(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    setSkip(0);
    await handleFetchContacts(true);
  };

  const filteredContacts = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return contacts;

    return contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(q) ||
        contact.email.toLowerCase().includes(q) ||
        contact.mobile.toLowerCase().includes(q) ||
        contact.message.toLowerCase().includes(q)
      );
    });
  }, [contacts, search]);

  return (

    <>
      <DashboardNavbar />
    <section className="space-y-8">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2">
              <HugeiconsIcon
                icon={ContactBookIcon}
                size={18}
                strokeWidth={1.8}
                className="text-cyan-300"
              />
              <span className="text-sm font-medium text-cyan-100">
                Contact Management
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Contacts Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              View and search submitted contact form records from your admin
              panel.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Loaded Contacts
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {contacts.length}
              </h3>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Visible Results
              </p>
              <h3 className="mt-2 text-2xl font-bold text-white">
                {filteredContacts.length}
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

      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-8">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={22}
                  strokeWidth={1.8}
                  className="text-cyan-300"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Search Contacts</h2>
                <p className="text-sm text-slate-400">
                  Search by name, email, mobile, or message.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={18}
                  strokeWidth={1.8}
                  className="text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search contacts"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={fetchingContacts}
                  className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20 disabled:opacity-60"
                >
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={18}
                    strokeWidth={1.8}
                  />
                  {fetchingContacts ? "Searching..." : "Search"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setSkip(0);
                    handleFetchContacts(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200"
                >
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    size={18}
                    strokeWidth={1.8}
                  />
                  Reset Search
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
                <HugeiconsIcon
                  icon={ViewIcon}
                  size={22}
                  strokeWidth={1.8}
                  className="text-violet-300"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Contact Details</h2>
                <p className="text-sm text-slate-400">
                  Click any contact card to view full details.
                </p>
              </div>
            </div>

            {selectedContact ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    Name
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    {selectedContact.name}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      size={16}
                      strokeWidth={1.8}
                      className="text-cyan-200"
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                      Email
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    {selectedContact.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Call02Icon}
                      size={16}
                      strokeWidth={1.8}
                      className="text-cyan-200"
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                      Mobile
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    {selectedContact.mobile}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Message01Icon}
                      size={16}
                      strokeWidth={1.8}
                      className="text-cyan-200"
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                      Message
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {selectedContact.message}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="break-all text-xs leading-6 text-slate-400">
                    <span className="font-semibold text-cyan-200">ID:</span>{" "}
                    {selectedContact._id}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
                <h3 className="text-lg font-semibold text-white">
                  No contact selected
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Click any contact card from the list to view details.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">All Contacts</h2>
              <p className="text-sm text-slate-400">
                View and search submitted contacts.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setSkip(0);
                  handleFetchContacts(true);
                }}
                disabled={fetchingContacts}
                className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/20 disabled:opacity-60"
              >
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={18}
                  strokeWidth={1.8}
                />
                {fetchingContacts ? "Refreshing..." : "Refresh"}
              </button>

              <button
                type="button"
                onClick={() => handleFetchContacts(false)}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-slate-200 disabled:opacity-60"
              >
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={18}
                  strokeWidth={1.8}
                />
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact, index) => (
                <div
                  key={contact._id || index}
                  className="cursor-pointer rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.05]"
                  onClick={() => setSelectedContact(contact)}
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {contact.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                      <HugeiconsIcon
                        icon={Mail01Icon}
                        size={14}
                        strokeWidth={1.8}
                      />
                      {contact.email}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                      <HugeiconsIcon
                        icon={Call02Icon}
                        size={14}
                        strokeWidth={1.8}
                      />
                      {contact.mobile}
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-3">
                    <p className="break-all text-xs leading-6 text-slate-400">
                      <span className="font-semibold text-cyan-200">ID:</span>{" "}
                      {contact._id}
                    </p>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                      Message Preview
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-300">
                      {contact.message}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
                <h3 className="text-lg font-semibold text-white">
                  No contacts found
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Try refreshing or changing the search text.
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