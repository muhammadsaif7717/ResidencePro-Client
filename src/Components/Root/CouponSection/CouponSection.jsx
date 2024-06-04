import CouponCard from "../CouponCard/CouponCard";



const CouponSection = () => {
    const coupons = [
        {
          title: "Summer Special",
          description: "Get 20% off on your first month's rent!",
          discount: 20,
        },
        {
          title: "Refer a Friend",
          description: "Refer a friend and get 15% off on next month's rent!",
          discount: 15,
        },
        {
          title: "Early Bird Discount",
          description: "Sign your lease early and save 10% on rent!",
          discount: 10,
        },
      ];
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
