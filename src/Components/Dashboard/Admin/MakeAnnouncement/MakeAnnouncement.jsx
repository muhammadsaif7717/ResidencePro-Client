import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const MakeAnnouncement = () => {
    const axiosPublic = useAxiosPublic();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [charCount, setCharCount] = useState({ title: 0, description: 0 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;

        const announcement = {
            title: title,
            description: description,
            date: new Date(),
        };

        try {
            const res = await axiosPublic.post('/announcements', announcement);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Announcement Published!",
                    text: "Your announcement has been successfully created and is now visible to all users.",
                    showConfirmButton: true,
                    confirmButtonColor: "#10B981",
                    confirmButtonText: "Great!"
                });
                form.reset();
                setCharCount({ title: 0, description: 0 });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to Create Announcement",
                text: "An error occurred. Please try again.",
                confirmButtonColor: "#EF4444"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTitleChange = (e) => {
        setCharCount(prev => ({ ...prev, title: e.target.value.length }));
    };

    const handleDescriptionChange = (e) => {
        setCharCount(prev => ({ ...prev, description: e.target.value.length }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
            <Helmet>
                <title>ResidencePro | Make Announcements</title>
            </Helmet>

            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-full mb-4">
                        <svg className="w-8 h-8 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                        Create New Announcement
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Share important updates and news with all residents
                    </p>
                </div>

                {/* Info Banner */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700 p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-blue-900 dark:text-blue-100 font-semibold mb-1">
                                Announcement Guidelines
                            </p>
                            <p className="text-blue-700 dark:text-blue-400 text-sm">
                                Your announcement will be immediately visible to all residents. Please ensure information is accurate and professional.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
                    <div className="space-y-6">
                        {/* Title Input */}
                        <div>
                            <label className="flex items-center justify-between mb-3">
                                <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    Announcement Title
                                </span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm">
                                    {charCount.title}/100
                                </span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                maxLength={100}
                                onChange={handleTitleChange}
                                className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter a clear and concise title..."
                                required
                            />
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 ml-1">
                                Example: "Scheduled Maintenance - Water Supply Interruption"
                            </p>
                        </div>

                        {/* Description Textarea */}
                        <div>
                            <label className="flex items-center justify-between mb-3">
                                <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Description
                                </span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm">
                                    {charCount.description}/500
                                </span>
                            </label>
                            <textarea
                                name="description"
                                rows="8"
                                maxLength={500}
                                onChange={handleDescriptionChange}
                                className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Provide detailed information about the announcement..."
                                required
                            />
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 ml-1">
                                Include relevant dates, times, and any action items for residents
                            </p>
                        </div>

                        {/* Preview Card */}
                        {(charCount.title > 0 || charCount.description > 0) && (
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <h3 className="text-slate-700 dark:text-slate-300 font-semibold">
                                        Preview
                                    </h3>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-slate-900 dark:text-slate-100 font-bold text-lg">
                                        {charCount.title > 0 ? document.querySelector('input[name="title"]')?.value : 'Your title will appear here...'}
                                    </h4>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                        {charCount.description > 0 ? document.querySelector('textarea[name="description"]')?.value : 'Your description will appear here...'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={(e) => {
                                    const form = e.target.closest('.bg-white, .dark\\:bg-slate-800').querySelector('form') || 
                                                e.target.closest('div').parentElement.querySelector('input, textarea').form;
                                    if (form) {
                                        form.reset();
                                        setCharCount({ title: 0, description: 0 });
                                    }
                                }}
                                disabled={isSubmitting}
                                className="flex-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-[2] bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-500 dark:to-blue-400 dark:hover:from-blue-600 dark:hover:to-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Publishing...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                        </svg>
                                        <span>Publish Announcement</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tips Card */}
                <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-200 dark:border-purple-700 p-6">
                    <h3 className="text-purple-900 dark:text-purple-100 font-bold mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Tips for Effective Announcements
                    </h3>
                    <ul className="space-y-2 text-purple-800 dark:text-purple-200 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                            <span>Keep titles short and descriptive (under 60 characters works best)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                            <span>Include specific dates, times, and locations when relevant</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                            <span>Use clear, professional language that's easy to understand</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 dark:text-purple-400 mt-0.5">•</span>
                            <span>Provide contact information if residents need to follow up</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MakeAnnouncement;