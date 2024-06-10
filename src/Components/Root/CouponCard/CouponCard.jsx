import { Link } from "react-router-dom";
import useMember from "../../../Hooks/useMember";


const CouponCard = ({ coupon }) => {
  const [isMember] = useMember()
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <div className="px-6 py-4">
        <div className="flex justify-between">
          <h3 className="font-bold text-xl mb-2">{coupon.code}</h3>
          <h3 className="mb-2 text-gray-500">{coupon.availability}</h3>
        </div>
        <p className="text-gray-700 text-base mb-4">{coupon.description}</p>
        <div className="text-center cursor-pointer bg-indigo-500 text-white py-2 rounded">
          {
            isMember ?
              <Link to={`/dashboard/make-payment`} className="font-semibold">Discount: {coupon.discount}%</Link>
              :
              <span className="font-semibold">Discount: {coupon.discount}%</span>
          }

        </div>
      </div>
    </div>
  );
};

export default CouponCard;
