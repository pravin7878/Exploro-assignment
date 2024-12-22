import React from "react";
import { IoBagAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartInfo = () => {
    const { totalItem } = useSelector((state) => state.cart);
const navigate = useNavigate()

    const hendelNavigate = ()=>{
            navigate("/cart")
    }

    return (
        <div onClick={hendelNavigate} className="relative cursor-pointer">
            <IoBagAdd size={30} />
            {totalItem > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItem}
                </span>
            )}
        </div>
    );
};

export default CartInfo;
