import {
    ImBin,
    GrEdit
} from "./icons";
import Button from './Button';

function DeleteConfirmation({ onCancel, onDelete, video, comment, tweet }) {

    return (
        <div className=' fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50' >
            <div className='relative border border-gray-600 rounded-lg overflow-y-scroll bg-black text-white p-6'>
                <div className=' flex gap-2'>
                    <ImBin size={25} className=' text-red-600' />
                    <div >
                        <h2 className=' text-xl pb-2'>
                            Delete {" "}
                            {
                                `${video ? "Video" : ""} 
                                ${comment ? "Comment" : ""} 
                                ${tweet ? "Tweet" : ""} 
                            `}
                        </h2>
                        <p className=' text-xs'>Are you sure you want to delete this {" "}
                            {
                                `${video ? "Video" : ""} 
                                ${comment ? "Comment" : ""} 
                                ${tweet ? "Tweet" : ""} 
                            `}?
                        </p>
                        <p className=' text-xs'>Once its deleted, you will not be able to recover it.</p>
                    </div>
                </div>
                <div className=' flex justify-center items-center gap-3 pt-4'>
                    <Button
                        bgColor='bg-[#212121] hover:bg-[#414141] '
                        className=' px-3 py-1.5 rounded-lg'
                        onClick={onCancel}
                    >Cancel</Button>
                    <Button
                        bgColor='bg-red-500 hover:bg-red-400 '
                        className=' px-3 py-1.5 rounded-lg'
                        onClick={onDelete}
                    >Delete</Button>
                </div>
            </div>
        </div>
    )
}
export default DeleteConfirmation