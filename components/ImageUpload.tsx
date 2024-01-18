import { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'
interface ImageUploadProps{
    onChange:(base64:string)=>void;
    label:string;
    value?:string;
    disabled?:boolean;
}

const ImageUpload:React.FC<ImageUploadProps> = ({
    onChange,label,value,disabled
    }) => {
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64:string)=>{
        onChange(base64);
    },[onChange]);

    const handleDrop = useCallback((files:any)=>{
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event:any)=>{
            setBase64(event.target.result);
            handleChange(event.target.result);
        };
        reader.readAsDataURL(file);
    },[handleChange]);

    const {getRootProps,getInputProps} = useDropzone({
        maxFiles:1,
        onDrop:handleDrop,
        disabled,
        accept:{
            'image/jpeg':[],
            'image/png':[]
        },
    });

    
    return ( 
        <div 
        {...getRootProps({
            className : 'w-full h-auto p-2 text-white text-center border-2 border-dotted rounded-md border-neutral-700 flex flex-col justify-center items-center'
        })}>
            <input {...getInputProps()}/>
            {
                base64?(
                    <div className="flex items-center justify-center">
                        <Image
                        src={base64}
                        height="300"
                        width="300"
                        alt="Uploaded Image"
                        />
                    </div>
                ):(
                    <p className="text-white py-12 md:py-24">{label}</p>
                )
            }
        </div>
     );
}
 
export default ImageUpload;