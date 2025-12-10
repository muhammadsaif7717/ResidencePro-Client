import { Link } from "react-router-dom";
import useMember from "../../../Hooks/useMember";

const CouponCard = ({ coupon }) => {
  const [isMember] = useMember();

  return (
    <div className="group relative bg-white dark:bg-slate-800 shadow-xl rounded-2xl overflow-hidden m-6 max-w-sm mx-auto border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
      {/* Sparkle Effect */}
      <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
        <span className="text-white text-xs font-bold tracking-wider">NEW</span>
      </div>

      {/* Header */}
      <div className="px-8 py-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
            <h3 className="font-bold text-2xl bg-gradient-to-r from-slate-900 dark:from-slate-100 to-slate-700 dark:to-slate-300 bg-clip-text text-transparent">
              {coupon.code}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-white/20 dark:bg-slate-700/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {coupon.availability || "Active"}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {coupon.description || "Exclusive discount for premium members"}
            </p>
          </div>
        </div>

        {/* Discount Badge */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-6 text-center border-2 border-primary/20 dark:border-primary/30 backdrop-blur-sm">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2 uppercase tracking-wide">
              You Save
            </p>
            <p className="text-5xl font-black bg-gradient-to-r from-primary via-secondary to-primary dark:from-primary dark:via-secondary dark:to-primary bg-clip-text text-transparent">
              {coupon.discount || 0}%
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              Off Your Next Payment
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          {isMember ? (
            <Link
              to="/dashboard/make-payment"
              className="block w-full py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 text-center border-2 border-transparent hover:border-white/50 flex items-center justify-center gap-2"
            >
              <span>Claim {coupon.discount}% Discount</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ) : (
            <div className="block w-full py-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-2xl text-center cursor-not-allowed border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Members Only</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Gradient Bar */}
      <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
    </div>
  );
};

export default CouponCard;
