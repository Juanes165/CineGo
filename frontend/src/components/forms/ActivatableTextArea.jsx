export default function ActivatableTextInput(props){
    
    const { className, ...other } = props;

    return (
        <textarea
            {...other}
            className={`focus:ring-red-500 focus:border-red-500 focus:ring-4 
            bg-gray-100 dark:bg-gray-700 dark:placeholder-gray-400 outline-none
            disabled:bg-white dark:disabled:bg-gray-900 disabled:px-0 disabled:cursor-text
            w-full h-fit resize-none py-2.5 px-4 rounded-lg text-lg ${className}`}
        />
    )
}