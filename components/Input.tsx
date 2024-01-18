interface InputProps{
    id:string;
    onChange: any;
    value:string;
    label:string;
    type?:string;
}

const Input:React.FC<InputProps> = ({id,onChange,value,label,type})=>{
    return (
        <div className="relative">
            <input id={id}
            type={type}
            value={value}
            onChange={onChange}
            className="
            block border-2 my-2 border-black rounded-md px-4 py-4 w-[70vw] md:w-[30vw] text-md text-black appearance-none focus:outline-none focus:ring-0 peer
            "
        placeholder={label}/>
        </div>
        
    )
};
export default Input