import { useQuery } from "@tanstack/react-query";
import CouponCard from "../CouponCard/CouponCard";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const CouponSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosPublic.get('/coupons');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0F172A]">
        <span className="loading loading-bars loading-lg scale-110 text-gray-800 dark:text-gray-100"></span>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-100 dark:bg-[#0F172A]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-8">
          Special Coupons
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {coupons.map((coupon, index) => (
            <CouponCard key={index} coupon={coupon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponSection;
