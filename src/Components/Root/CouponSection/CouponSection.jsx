import { useQuery } from "@tanstack/react-query";
import CouponCard from "../CouponCard/CouponCard";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";



const CouponSection = () => {
  const axiosPublic=useAxiosPublic();
  const {data:coupons=[],isLoading}=useQuery({
    queryKey:['coupons'],
    queryFn: async()=>{
      const res= await axiosPublic.get('/coupons');
      return res.data;
    }
  });

  if (isLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-bars loading-lg scale-110"></span>
        </div>
    );
}

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">Special Coupons</h2>
        <div className="flex flex-wrap justify-center">
          {coupons.map((coupon, index) => (
            <CouponCard key={index} coupon={coupon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponSection;
