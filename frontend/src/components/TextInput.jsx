export default function TextInput(props){
    
    const { className, ...other } = props;

    return (
        <input
            {...other}
            className={`focus:ring-red-500 focus:border-red-500 focus:ring-4 
            bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 outline-none
            w-full py-2.5 px-4 rounded-lg text-lg ${className}`}
        />
    )
}