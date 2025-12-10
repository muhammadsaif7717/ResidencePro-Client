import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Announcements = () => {
    const axiosPublic = useAxiosPublic();
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcements');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-500"></div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading announcements...</p>
                </div>
            </div>
        );
    }

    const getAnnouncementIcon = (index) => {
        const icons = [
            // Megaphone
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>,
            // Bell
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>,
            // Information
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
            // Speakerphone
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
        ];
        return icons[index % icons.length];
    };

    const getColorScheme = (index) => {
        const schemes = [
            {
                bg: 'bg-blue-100 dark:bg-blue-500/10',
                text: 'text-blue-600 dark:text-blue-400',
                border: 'border-blue-200 dark:border-blue-700',
                gradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
            },
            {
                bg: 'bg-purple-100 dark:bg-purple-500/10',
                text: 'text-purple-600 dark:text-purple-400',
                border: 'border-purple-200 dark:border-purple-700',
                gradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
            },
            {
                bg: 'bg-emerald-100 dark:bg-emerald-500/10',
                text: 'text-emerald-600 dark:text-emerald-400',
                border: 'border-emerald-200 dark:border-emerald-700',
                gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20'
            },
            {
                bg: 'bg-amber-100 dark:bg-amber-500/10',
                text: 'text-amber-600 dark:text-amber-400',
                border: 'border-amber-200 dark:border-amber-700',
                gradient: 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20'
            }
        ];
        return schemes[index % schemes.length];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
            <Helmet>
                <title>ResidencePro | Announcements</title>
            </Helmet>

            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-full mb-4">
                        <svg className="w-8 h-8 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                        Announcements
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Stay updated with the latest news and important information
                    </p>
                </div>

                {/* Stats Banner */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 dark:bg-blue-500/10 p-3 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Total Announcements</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                                    {announcements.length}
                                </p>
                            </div>
                        </div>
                        {announcements.length > 0 && (
                            <div className="hidden sm:flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="font-medium text-sm">Up to date</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Announcements List */}
                {announcements.length === 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
                        <div className="bg-slate-100 dark:bg-slate-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                            No Announcements Yet
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Check back later for important updates and news from the management.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {announcements.map((announcement, index) => {
                            const colorScheme = getColorScheme(index);
                            return (
                                <div
                                    key={announcement._id}
                                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                                >
                                    <div className={`bg-gradient-to-r ${colorScheme.gradient} p-1`}></div>
                                    <div className="p-6">
                                        <div className="flex items-start gap-4">
                                            {/* Icon Badge */}
                                            <div className={`${colorScheme.bg} ${colorScheme.text} p-3 rounded-xl flex-shrink-0`}>
                                                {getAnnouncementIcon(index)}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4 mb-3">
                                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                                        {announcement.title}
                                                    </h3>
                                                    <span className={`px-3 py-1 ${colorScheme.bg} ${colorScheme.text} rounded-full text-xs font-semibold whitespace-nowrap`}>
                                                        New
                                                    </span>
                                                </div>
                                                
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                                    {announcement.description}
                                                </p>

                                                {/* Footer */}
                                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>
                                                            {announcement.date ? new Date(announcement.date).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            }) : 'Recently posted'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        <span>Management</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Info Footer */}
                {announcements.length > 0 && (
                    <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700 p-6">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-blue-900 dark:text-blue-100 font-semibold mb-1">
                                    Stay Informed
                                </p>
                                <p className="text-blue-700 dark:text-blue-400 text-sm">
                                    Check this page regularly for important updates, maintenance schedules, and community news. For urgent matters, please contact the management office directly.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Announcements;