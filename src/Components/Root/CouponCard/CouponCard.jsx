

const CouponCard = ({ coupon }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{coupon.code}</h3>
        <p className="text-gray-700 text-base mb-4">{coupon.description}</p>
        <div className="text-center bg-indigo-500 text-white py-2 rounded">
          <span className="font-semibold">Discount: {coupon.discount}%</span>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
