
import { useState } from "react";
import { toast } from "react-toastify";
import { performRefund } from "../services/blockchain";

const PerformRefundButton = ({ project }) => {
    const [loading, setLoading] = useState(false);
    
    const handleRefund = async () => {
        setLoading(true);
        await performRefund(project.id);
        toast.success("Refund done successfully");
        setLoading(false);
    };
    
    return (
        <div className=" fixed left-[68rem] top-[15.3rem]">
            <div className=" flex flex-col">
                    <button
                    onClick={handleRefund}
                    className="inline-block px-6 py-2.5 bg-orange-600
                    text-white font-medium text-md leading-tight
                    rounded-full shadow-md hover:bg-orange-700 mt-5"
                    disabled={loading}
                    >
                    {loading ? "Loading..." : "Refund"}
                </button>
            </div>

        
        </div>
        
    );
}

export default PerformRefundButton;