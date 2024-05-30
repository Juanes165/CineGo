'use client';
import { useEffect, useState } from "react";
import { UploadIcon } from "@/utils/icons";

export default function DragAndDrop({ file, setFile }) {

    const [dragging, setDragging] = useState(false);

    // This functions handles the files uploaded input when the button is clicked
    const handleFileChange = (event) => {
        if (event.target.files) {
            console.log(event.target.files[0]);
            setFile(event.target.files[0]);
        }
    };

    // This function handles the files dropped in the drag and drop area
    const handleDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            console.log(event.dataTransfer.files[0]);
            setFile(event.dataTransfer.files[0]);
        }
        setDragging(false);
    };

    console.log(dragging)

    return (
        <section className="bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                onDragEnter={() => setDragging(true)}
                onDragLeave={() => setDragging(false)}
                className={`flex flex-col items-center justify-center relative rounded-lg p-4
                border-2 border-dashed border-gray-900/25 dark:border-white/25 transition-all duration-150
                ${dragging ? "bg-gray-900/20 dark:bg-white/5" : "bg-transparent"}`}
            >
                <div>
                    <div className="upload-info flex flex-col items-center text-center mb-1">
                        <UploadIcon className={`w-28 h-28 text-red-500 ${dragging ? "animate-float" : ""}`} />
                        <p className="text-2xl font-bold">Arrastra tu imagen aquí</p>
                    </div>
                    <input
                        type="file"
                        hidden
                        id="browse"
                        onChange={handleFileChange}
                        accept=".png, .jpg, .jpeg, .svg"
                    />
                    <p className="text-center">- O -</p>
                    <label
                        htmlFor="browse"
                        className="flex items-center justify-center rounded-lg 
                                cursor-pointer text-xl font-semibold transition-all mb-4 text-red-500 ease-in-out relative
                                before:transition-[width] before:ease-in-out before:duration-300 before:absolute before:bg-red-500 before:origin-center before:h-[2px] before:w-0 hover:before:w-[35%] before:-bottom-1 before:left-[50%]
                                after:transition-[width] after:ease-in-out after:duration-300 after:absolute after:bg-red-500 after:origin-center after:h-[2px] after:w-0 hover:after:w-[35%] after:-bottom-1 after:right-[50%]"
                    >
                        Selecciona de tu dispositivo
                    </label>
                    <p className="text-lg text-balance">
                            <span className="font-semibold">Formatos soportados: </span>.PDF, .PNG, .JPG, .JPEG
                    </p>
                </div>
            </div>
        </section>
    );
};