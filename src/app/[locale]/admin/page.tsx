"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Battery, LogOut, MessageSquare, Users, CheckCircle, Clock, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Contact {
  id: number;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  product: string | null;
  message: string;
  status: string;
  created_at: string;
}

interface Stats {
  total: number;
  pending: number;
  read: number;
  replied: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || "en";
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, read: 0, replied: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) {
        router.push(`/${locale}/admin/login`);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts as Contact[]);
        setStats(data.stats as Stats);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // Ignore logout errors
    }
    router.push(`/${locale}/admin/login`);
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchData();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    pending: { label: "Pending", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" },
    read: { label: "Read", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
    replied: { label: "Replied", color: "text-green-600", bg: "bg-green-50 border-green-200" },
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Battery className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">NEWARE Admin</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} aria-label="Logout">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <Button variant="outline" size="sm" onClick={fetchData} aria-label="Refresh data">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Inquiries", value: stats.total, icon: MessageSquare, color: "text-slate-600 bg-slate-100" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-600 bg-yellow-50" },
            { label: "Read", value: stats.read, icon: Users, color: "text-blue-600 bg-blue-50" },
            { label: "Replied", value: stats.replied, icon: CheckCircle, color: "text-green-600 bg-green-50" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-600">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-slate-600" role="status" aria-live="polite">Loading...</div>
            ) : contacts.length === 0 ? (
              <div className="p-8 text-center text-slate-600">No inquiries yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Company</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Message</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">{contact.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          <a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{contact.company || "-"}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{contact.product || "-"}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{contact.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <label className="sr-only" htmlFor={`status-${contact.id}`}>Change status for {contact.name}</label>
                          <select
                            id={`status-${contact.id}`}
                            value={contact.status}
                            onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                            className={`text-xs font-semibold rounded-full px-3 py-1 border cursor-pointer ${statusConfig[contact.status]?.bg} ${statusConfig[contact.status]?.color}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">{formatDate(contact.created_at)}</td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(contact.id)}
                            className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                            aria-label={`Delete inquiry from ${contact.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
