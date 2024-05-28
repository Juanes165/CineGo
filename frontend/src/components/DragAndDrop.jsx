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

    return (
        <section className="bg-amethyst/10 dark:bg-wisteria/20 rounded-lg">
            <div
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                onDragEnter={() => setDragging(true)}
                onDragLeave={() => setDragging(false)}
                className={`flex flex-col items-center justify-center relative rounded-lg p-4
                border-4 border-dashed border-amethyst dark:border-grape transition-all duration-150
                ${dragging ? "bg-amethyst/20 dark:bg-wisteria/5" : "bg-transparent"}`}
            >
                <div>
                    <div className="upload-info flex flex-col items-center text-center mb-4">
                        <UploadIcon className={`w-28 h-28 text-amethyst ${dragging ? "animate-float" : ""}`} />
                        <p className="text-2xl mb-2 font-bold">Arrastra tus archivos aquí</p>
                        <p className="text-lg text-balance">
                            <span className="font-semibold">Formatos soportados: </span>.PDF, .PNG, .JPG, .JPEG
                        </p>
                    </div>
                    <input
                        type="file"
                        hidden
                        id="browse"
                        onChange={handleFileChange}
                        accept=".png, .jpg, .jpeg, .svg"
                    />
                    <label
                        htmlFor="browse"
                        className="flex items-center justify-center py-2 px-4 rounded-lg 
                                cursor-pointer text-lg font-semibold text-main-light
                                bg-amethyst hover:bg-grape
                                transition-all duration-200"
                    >
                        Seleccionar archivos
                    </label>
                </div>
            </div>
        </section>
    );
};