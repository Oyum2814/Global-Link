
import { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'
import toast from 'react-hot-toast';
import { getFileById } from '@/pages/appwrite';

interface ImageUploadProps{
    onChange:(base64:any)=>void;
    label:string;
    disabled?:boolean;
    user?:any;
}

const ImageUpload:React.FC<ImageUploadProps> = ({
    onChange,label,disabled,user
    }) => {
    const [base64, setBase64] = useState<File | null>(null);

    const [compressedImages, setCompressedImages] = useState<File[]>([]);

    const handleChange = useCallback((base64:string)=>{
        onChange(base64);
    },[onChange]);

    const handleDrop = useCallback(async (files:any)=>{
        const file = files[0];
        console.log("Current Size :"+file.size);
        if(file.size<=30000)
        {
            setBase64(file);
            handleChange(file);
        }
        else if(file.size<5000000000){
            try{
                const { compressedFile, base64String } = await compressImage(file);
                setBase64(file);
                handleChange(file);
                // setBase64(base64String); // Update to base64 string, not object URL
                // handleChange(base64String);
                // console.log("Compressed Size : "+compressedFile.size);
                // console.log(base64String);
            }
            catch(error){
                toast.error('Incompatible Image. Try Again!');
            }
        }
        else{
            toast.error("File size too big.");
        }
       
    },[handleChange,toast]);

    const compressImage = async (file: File): Promise<{ compressedFile: File; base64String: string }> => {
        return new Promise((resolve) => {
          const reader = new FileReader();
      
          reader.onload = (event) => {
            const img = document.createElement('img') as HTMLImageElement;
            img.src = event.target?.result as string;
      
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
      
              const maxWidth = 240;
              const maxHeight = 180;
              let width = img.width;
              let height = img.height;
      
              if (width > maxWidth || height > maxHeight) {
                const aspectRatio = width / height;
      
                if (width > height) {
                  width = maxWidth;
                  height = maxWidth / aspectRatio;
                } else {
                  height = maxHeight;
                  width = maxHeight * aspectRatio;
                }
              }
      
              canvas.width = width;
              canvas.height = height;
      
              ctx?.drawImage(img, 0, 0, width, height);
      
              canvas.toBlob((blob) => {
                const compressedFile = new File([blob as Blob], file.name, { type: file.type });
      
                const readerBase64 = new FileReader();
                readerBase64.onload = (eventBase64) => {
                  const base64String = eventBase64.target?.result as string;
                  resolve({ compressedFile, base64String });
                };
                readerBase64.readAsDataURL(compressedFile);
              }, file.type);
            };
          };
      
          reader.readAsDataURL(file);
        });
      };
      
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
                        src={URL.createObjectURL(base64)}
                        height="300"
                        width="300"
                        alt="Uploaded Image"
                        />
                    </div>
                ):(
                    <div className="flex items-center justify-center">
                        <Image  
                        height="300"
                        width="300"
                        alt="Uploaded Image"
                        src={user?.image? getFileById(user?.image):''} />
                    </div>
                )
            }
        </div>
     );
}
 
export default ImageUpload;
